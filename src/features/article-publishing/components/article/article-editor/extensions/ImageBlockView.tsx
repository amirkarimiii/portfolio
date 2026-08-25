'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { X, Image as ImageIcon, UploadCloud, Check, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Badge } from "@/shared/components/ui/badge";

export function ImageBlockView({ node, updateAttributes, deleteNode }: NodeViewProps) {
    const { src, alt, caption, isEditing } = node.attrs;

    const [fileSrc, setFileSrc] = useState<string>(src || '');
    const [altText, setAltText] = useState<string>(alt || '');
    const [captionText, setCaptionText] = useState<string>(caption || '');
    const [previewUrl, setPreviewUrl] = useState<string>(src || '');
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localPreview = URL.createObjectURL(file);
        setPreviewUrl(localPreview);

        if (!altText) {
            const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
            setAltText(fileNameWithoutExt);
        }

        try {
            setIsUploading(true);

            const res = await fetch(`/api/blog/upload?filename=${encodeURIComponent(file.name)}`, {
                method: 'POST',
                body: file,
            });

            if (!res.ok) throw new Error('Upload failed');

            const blob = await res.json();

            setFileSrc(blob.url);
            setPreviewUrl(blob.url);
        } catch (error) {
            console.error('Image upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = () => {
        if (!fileSrc || isUploading) return;
        updateAttributes({
            src: fileSrc,
            alt: altText,
            caption: captionText,
            isEditing: false,
        });
    };

    const handleEdit = () => {
        updateAttributes({ isEditing: true });
    };

    const isUnoptimized = (url: string) =>
        url.startsWith('blob:') || url.startsWith('data:');

    return (
        <NodeViewWrapper className="my-6">
            {isEditing || !src ? (
                <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <div className="w-4 aspect-square">
                                <ImageIcon />
                            </div>
                            <span>Add / Edit Image</span>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={deleteNode}
                        >
                            <div className="w-4 aspect-square">
                                <X />
                            </div>
                        </Button>
                    </div>

                    <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-6 transition-colors hover:bg-muted/50">
                        <label className="flex flex-col items-center justify-center gap-2 text-center cursor-pointer w-full h-full">
                            {previewUrl ? (
                                <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                                    <Image
                                        src={previewUrl}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                        unoptimized={isUnoptimized(previewUrl)}
                                        sizes="(max-width: 768px) 100vw, 576px"
                                    />
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-medium">
                                            <div className="w-4 aspect-square animate-spin">
                                                <Loader2 />
                                            </div>
                                            Uploading...
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="rounded-full bg-background p-3 shadow-sm">
                                        <div className="w-6 aspect-square">
                                            <UploadCloud />
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-foreground">
                                        Click to select an image
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        Allowed formats: PNG, JPG, WEBP
                                    </span>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                disabled={isUploading}
                            />
                        </label>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="alt-text" className="sr-only">
                            Alt Text
                        </Label>
                        <Badge variant="outline" className="w-fit select-none opacity-80">
                            Alt Text
                        </Badge>
                        <Input
                            id="alt-text"
                            placeholder="Short description of the image for SEO..."
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                            className="text-sm"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="caption-text" className="sr-only">
                            Caption (optional)
                        </Label>
                        <Badge variant="outline" className="w-fit select-none opacity-80">
                            Caption (optional)
                        </Badge>
                        <Input
                            id="caption-text"
                            placeholder="Description displayed under the image..."
                            value={captionText}
                            onChange={(e) => setCaptionText(e.target.value)}
                            className="text-sm"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={deleteNode}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            disabled={!fileSrc || isUploading}
                            onClick={handleSave}
                            className="gap-1.5"
                        >
                            {isUploading ? (
                                <div className="w-4 aspect-square animate-spin">
                                    <Loader2 />
                                </div>
                            ) : (
                                <div className="w-4 aspect-square">
                                    <Check />
                                </div>
                            )}
                            Save Image
                        </Button>
                    </div>
                </div>
            ) : (
                <figure className="group relative mx-auto my-6 max-w-3xl text-center">
                    <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={handleEdit}
                            className="h-8 rounded-md bg-background/80 px-2.5 text-xs shadow-md backdrop-blur-sm hover:bg-background"
                        >
                            Edit
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={deleteNode}
                            className="h-8 w-8 rounded-md shadow-md"
                            title="Delete image"
                        >
                            <div className="w-4 aspect-square">
                                <X />
                            </div>
                        </Button>
                    </div>

                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted/10 shadow-sm">
                        <Image
                            src={src}
                            alt={alt || 'Article image'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 800px"
                            unoptimized={isUnoptimized(src)}
                            priority={false}
                        />
                    </div>

                    {caption && (
                        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                            {caption}
                        </figcaption>
                    )}
                </figure>
            )}
        </NodeViewWrapper>
    );
}