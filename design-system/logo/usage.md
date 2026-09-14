# Logo

Health OS has two logo files. Both are used exactly as supplied.

- **The mark:** a rounded square filled with the signature gradient, with "OS" in white.
- **The long logo:** HEALTH beside the OS tile in a rounded frame, 2.8 : 1. It comes in two versions:
  - **white background:** a white fill inside a gradient edge, with gradient letters.
  - **filled background:** the gradient fill with white letters and a white OS tile.

## Files

| File | Use |
|---|---|
| `health-os-logo.png` | The mark, 500 × 500 with a transparent background. `LogoMark` renders `public/health-os-logo.png` |
| `health-os-long-white.png` | The long logo on a white background, 1120 × 400. `LogoLong variant="white"` renders `public/logo/health-os-long-white.png` |
| `health-os-long-filled.png` | The long logo on a filled background, 1120 × 400. `LogoLong variant="filled"` renders `public/logo/health-os-long-filled.png` |
| `health-os-logo.svg` | Not a true vector: it wraps PNG rasters. Do not use it where a vector is expected |

True vector files are an open decision (see [REFERENCE.md](../REFERENCE.md#open-decisions)).

## Which one

- **The mark** for favicons, navigation, avatars, app icons and any square or tight space.
- **The long logo** for headers, footers, email signatures, documents and slides with room for a wide logo.
  - **White background** where the logo should stay quiet: busy or tinted layouts.
  - **Filled background** where the logo is the main brand moment. It counts as the view's gradient moment.
- Use one version per layout, never both side by side.

## Grounds

Both logos are used on:

- the light ground (white),
- the paper ground (warm ivory).

There is no dark ground in the system, so neither logo is placed on carbon or black. On a photo, place the logo on a paper or surface chip rather than directly on the image.

## Size and space

- The mark: clear space of at least a quarter of its width on every side. 16px is the smallest size in use (the favicon); prefer 24px or more. In navigation it sits at 32px; in a footer or email, 32 to 40px.
- The long logo: at least 32px tall, with clear space of at least half its height on every side.

## Keep it as supplied

- Do not recolour, reverse or re-angle the gradient.
- Do not stretch, crop, rotate or re-round the corners.
- Do not separate HEALTH from the OS tile, or re-space the letters.
- Do not add a shadow, outline, glow or texture.
- Do not rebuild the letters in another typeface.
