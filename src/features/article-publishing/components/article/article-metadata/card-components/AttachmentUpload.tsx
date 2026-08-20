'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/button';
import { validateImageFile } from '@/features/article-publishing/utils/imageValidation';

export interface FileAttachment {
    file?: File;
    url: string;
    name: string;
    size?: number;
}

interface AttachmentUploadProps {
    value?: string | FileAttachment;
    onChange: (value: string | FileAttachment | null) => void;
    label: string;
    description?: string;
}

function formatFileSize(bytes?: number): string {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AttachmentUpload({
                                     value,
                                     onChange,
                                     label,
                                     description,
                                 }: AttachmentUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isValidating, setIsValidating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const currentAttachment: FileAttachment | null = value
        ? typeof value === 'string'
            ? { url: value, name: value.split('/').pop() || 'Attached File' }
            : value
        : null;

    const validateAndProcessFile = async (file: File) => {
        setErrorMessage(null);
        setIsValidating(true);

        try {
            const validation = await validateImageFile(file);

            if (!validation.valid) {
                const errorMsg = validation.error || 'Invalid image file';
                setErrorMessage(errorMsg);
                toast.error('Image Validation Failed', {
                    description: errorMsg,
                });
                return;
            }

            const previewUrl = URL.createObjectURL(file);
            onChange({
                file,
                url: previewUrl,
                name: file.name,
                size: file.size,
            });

            toast.success('Image attached successfully');
        } catch {
            const fallbackError = 'Failed to process image file';
            setErrorMessage(fallbackError);
            toast.error('Error', { description: fallbackError });
        } finally {
            setIsValidating(false);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            validateAndProcessFile(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            validateAndProcessFile(file);
        }
    };

    const handleRemove = () => {
        setErrorMessage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        onChange(null);
        toast.info('Image removed');
    };

    return (
        <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">{label}</span>
            {currentAttachment ? (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-card text-card-foreground gap-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted shrink-0 border flex items-center justify-center">
                            {currentAttachment.url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={currentAttachment.url}
                                    alt={currentAttachment.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-6 w-6 text-muted-foreground">
                                    <ImageIcon/>
                                </div>
                            )}
                        </div>

                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{currentAttachment.name}</p>
                            {currentAttachment.size && (
                                <p className="text-xs text-muted-foreground">
                                    {formatFileSize(currentAttachment.size)}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isValidating}
                            onClick={() => fileInputRef.current?.click()}
                            className="h-8 text-xs gap-1"
                        >
                            <div className="w-3.5 aspect-square">
                                <RefreshCw/>
                            </div>
                            Replace
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            disabled={isValidating}
                            onClick={handleRemove}
                            className="h-8 text-xs gap-1"
                        >
                            <div className="w-3.5 aspect-square">
                                <Trash2/>
                            </div>
                            Delete
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => !isValidating && fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                        isDragging
                            ? 'border-primary bg-primary/5'
                            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                    } ${isValidating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <div className="p-3 bg-muted rounded-full mb-3">
                        <div className="h-6 w-6 text-muted-foreground" >
                            <Upload/>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                        {isValidating ? 'Validating image...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Allowed formats: JPG, PNG, WEBP, GIF (Max 5MB)
                    </p>
                    {description && (
                        <p className="text-xs text-muted-foreground/70 mt-1">{description}</p>
                    )}
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleFileChange}
            />

            {errorMessage && (
                <p className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                    <div className="h-3.5 w-3.5" >
                        <AlertCircle/>
                    </div>
                    {errorMessage}
                </p>
            )}
        </div>
    );
}