# React Document Picture-in-Picture

A React component library for creating Picture-in-Picture windows using the Document Picture-in-Picture API.

![React PIP Demo](./demo.gif)

## Browser Support

- This feature may not work in some browsers. Browser compatibility can be checked at [CanIUse](https://caniuse.com/mdn-api_documentpictureinpicture).

- This feature is only available in [Secure Contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (HTTPS or localhost).

## Styled Components not supported

If you need styled-components support, please use **[react-styled-pip](https://www.npmjs.com/package/react-styled-pip)** instead.

## Installation

```bash
npm install react-document-pip
```

## Usage

### Basic Example

```tsx
import { useState } from "react";
import DocumentPip from "react-document-pip";

function App() {
  const [isPipOpen, setIsPipOpen] = useState(false);

  const togglePip = () => {
    setIsPipOpen(!isPipOpen);
  };

  const handleClose = () => {
    setIsPipOpen(false);
  };

  return (
    <>
      <DocumentPip
        isPipOpen={isPipOpen}
        size={{ width: 500, height: 400 }}
        className="dark"
        onClose={handleClose}
      >
        <MyComponent />
      </DocumentPip>
      <button onClick={togglePip}>Toggle PIP</button>
    </>
  );
}
```

### Using Window Methods Or Web APIs in PIP window

```tsx
// ...

const pipWindowRef = useRef<Window | null>(null);

const onClickButton = () => {
  pipWindowRef.current?.alert("alert in pip window");
};

function App() {
  return (
    <>
      <DocumentPip
        mode="transfer-only"
        ref={pipWindowRef}
        isPipOpen={isPipOpen}
        onClose={handleClose}
      >
        <div className="pip-content">
          <h1>PIPContent</h1>
          <button onClick={onClickButton}>BUTTON</button>
        </div>
      </DocumentPip>
      <button onClick={togglePip}>Toggle PIP</button>
    </>
  );
}
```

## API Reference

### DocumentPIP ForwardedRef

| Type             | Description |
| ---------------- | ----------- |
| `Window \| null` | PIP window  |

### DocumentPIP Props

| Prop                           | Type                                       | Default      | Description                                                                                                                       |
| ------------------------------ | ------------------------------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `children`                     | `React.ReactNode`                          | -            | The content to display in the PIP window                                                                                          |
| `isPipOpen`                    | `boolean`                                  | -            | Controls whether the PIP window is open                                                                                           |
| `size`                         | `Partial<PIPWindowSize>`                   | -            | Size of the PIP window                                                                                                            |
| `mode`                         | `'clone' \| 'transfer' \| 'transfer-only'` | `'transfer'` | Content display mode<br>`clone`: keep original + copy<br>`transfer`: move to PIP<br>`transfer-only`: move to PIP without original |
| `copyAllStyles`                | `boolean`                                  | `true`       | Whether to copy all styles to PIP window                                                                                          |
| `disallowReturnToOpener`       | `boolean`                                  | `false`      | Whether to disallow returning to the opener window                                                                                |
| `preferInitialWindowPlacement` | `boolean`                                  | `false`      | Whether to prefer initial window placement                                                                                        |
| `className`                    | `string`                                   | `''`         | pip window documentElement classname                                                                                              |
| `onEnter`                      | `() => void`                               | -            | Callback function when the PIP window is opesuccessfully opened                                                                   |
| `onClose`                      | `() => void`                               | -            | Callback function when the PIP window is closed                                                                                   |

### Types

```typescript
interface PIPWindowSize {
  width: number;
  height: number;
}

type PIPMode = "clone" | "transfer" | "transfer-only";

interface DocumentPIPProps {
  children: React.ReactNode;
  isPipOpen: boolean;
  size?: Partial<PIPWindowSize>;
  mode?: PIPMode;
  copyAllStyles?: boolean;
  disallowReturnToOpener?: boolean;
  preferInitialWindowPlacement?: boolean;
  className?: string;
  onEnter?: (e: DocumentPictureInPictureEvent) => void;
  onClose: () => void;
}
```

## Browser Support

This library uses the [Document Picture-in-Picture API](https://developer.chrome.com/docs/web-platform/document-picture-in-picture/), which is currently supported in:

- Chrome 116+
- Edge 116+
- Opera 102+

## Related Packages

- [react-styled-pip](https://www.npmjs.com/package/react-styled-pip) - React version with styled-components support
- [vue-pip](https://www.npmjs.com/package/vue-pip) - Vue version of Document Picture-in-Picture

## License

MIT
