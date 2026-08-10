# Media & Asset Standards

## 1. General Image Requirements

### Supported Formats

* **Allowed:** JPG, JPEG, PNG, GIF
* **Not Supported:** SVG, Lottie
* Images should be used with the smallest possible file size without noticeable quality loss.
* The final format of each image should be selected based on the type of content and its intended use.

### Image Quality

* Images must not have visible compression, pixelation, or artifacts.
* Images must be produced at a quality suitable for display at the largest required size.
* Avoid upscaling small images for display at larger dimensions.

---

## 2. Cover Image

### Purpose

The main article image used on the article page and in places where the article is presented as primary content.

### Requirements

* **Required for Publishing:** Yes
* **Supported Formats:** JPG, JPEG, PNG, GIF
* **Aspect Ratio:** TBD — to be determined after UI testing across different breakpoints
* **Recommended Dimensions:** TBD
* **Maximum File Size:** TBD
* **Responsive Behavior:** TBD

### Alt Text

* **Required for Publishing:** Yes
* Must be entered manually by the author/admin.
* Alt text must describe the actual, understandable content of the image.
* Avoid keyword stuffing in Alt Text.
* If an automated pattern is used, the final value must be reviewable before publishing.

---

## 3. Thumbnail

### Purpose

An image used in Content Cards, article lists, and social networks.

### Requirements

* **Required for Publishing:** Yes
* **Supported Formats:** JPG, JPEG, PNG, GIF
* **Aspect Ratio:** TBD
* **Recommended Dimensions:** TBD
* **Maximum File Size:** TBD
* **Responsive Behavior:** TBD

### Alt Text

* **Editable:** No
* Value is automatically generated from Cover Alt Text:

`<cover-alt>_thmb`

* The generated value is displayed only for informational/system use.

---

## 4. In-Article Images

### Purpose

Images placed inside the article content and TipTap content.

### Requirements

* **Supported Formats:** JPG, JPEG, PNG, GIF
* **Aspect Ratio:** Flexible
* **Recommended Dimensions:** TBD
* **Maximum File Size:** TBD
* **Responsive Behavior:** TBD

### Display Rules

* The image must not exceed the width of the article content container.
* Images must be displayed responsively.
* The original aspect ratio should be preserved as much as possible.
* Avoid disproportionate stretching or compression of the image.

### Alt Text

* Alt Text must be provided for meaningful images.
* Purely decorative images should be handled according to the system’s accessibility behavior.
* Alt Text must not consist solely of the image file name.

---

## 5. Responsive Image Standards

Final image sizes across different breakpoints will be determined after UI testing.

| Asset            | Mobile | Tablet | Desktop | Status          |
|------------------|--------|--------|---------|-----------------|
| Cover Image      | TBD    | TBD    | TBD     | Pending UI Test |
| Thumbnail        | TBD    | TBD    | TBD     | Pending UI Test |
| In-Article Image | TBD    | TBD    | TBD     | Pending UI Test |

### Breakpoints

Official breakpoints and exact sizes for each asset must be added to this file after design testing and final results are recorded.

---

## 6. Image Naming Convention

File names must:

* Be written in lowercase letters.
* Not use spaces.
* Use `-` to separate words.
* Be descriptive and understandable.
* Avoid generic names such as `image1.jpg` or `final.png`.

### Example

`how-to-create-seo-friendly-url.jpg`

---

## 7. Accessibility

* Content images must have appropriate Alt Text.
* Alt Text must be descriptive, concise, and relevant to the role of the image in the content.
* Unnecessary information such as “image of” or “picture of” should not be added at the beginning of Alt Text unless semantically necessary.
* Decorative images must not convey unnecessary content information to screen reader users.

---

## 8. Future Optimization

The following items will be completed after testing and performance review:

* Exact Width / Height per Breakpoint
* Aspect Ratio per Asset Type
* Maximum File Size
* Compression Quality
* Responsive Image Strategy
* `srcset` / `sizes` Strategy
* Lazy Loading Rules
* Image Preloading Rules
* CDN / Image Optimization Strategy
