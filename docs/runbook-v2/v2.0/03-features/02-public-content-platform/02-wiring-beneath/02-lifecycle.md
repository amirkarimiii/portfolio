```todo:subbranches
step: make branch feature/pcp-lifecycle
```


```
loop: 
```

```backlog

اگر مقاله بعداً از سرور load شود، مثلاً:

const article = await getArticle(id);

و بعد بخواهید فرم را با اطلاعات مقاله پر کنید، آن موقع:

getValues('content')

فقط مقدار لحظه‌ی mount را می‌گیرد.

مثلاً اگر:

reset(article)

بعد از mount انجام شود، Tiptap خودش متوجه تغییر content در RHF نمی‌شود.

در آن سناریو، آن synchronization که الان با useEffect دارید واقعاً لازم می‌شود.

ولی آن موقع می‌توانیم دقیق‌تر طراحی کنیم؛ مثلاً:

const content = useWatch({
    control,
    name: 'content',
});

و فقط برای synchronization خارجی:

useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== content) {
        editor.commands.setContent(content, {
            emitUpdate: false,
        });
    }
}, [editor, content]);

این کاملاً متفاوت از استفاده‌ی فعلی watch در parent است.

```

```backlog
کارای مرتبط با /preview میاد اینجا
و همچنین /blog/:articleSlug
```

```
commit changes
```

```todo:subbranches
step: Checkout the branch feature/pcp-wiring-beneath
```

```todo:subbranches
step: Merge the branch feature/pcp-lifecycle into feature/pcp-wiring-beneath
```

```todo:subbranches
step: Delete the branch feature/pcp-lifecycle
```

```todo:subbranches
step: go to article-creation-and-edit-runbook line 
```