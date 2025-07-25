import {
    createElement,
    CSSProperties,
    SVGProps,
    JSXElementConstructor,
} from "react";



/**
 * Taken from react-icomoon by @aykutkardas
 * commit: fd149d0a2deca0a9f2b8953a170494e9fba12495
 * https://github.com/aykutkardas/react-icomoon/blob/main/src/index.tsx
 */
type IconSetItem = {
  properties: {
    name: string;
  };
  icon: {
    paths: string[];
    attrs?: Object[];
    width?: number | string;
  };
}

type IconSet = {
  icons: IconSetItem[];
}

interface IconProps extends SVGProps<SVGElement> {
  icon: string;
  size?: string | number;
  title?: string;
  disableFill?: boolean;
  removeInlineStyle?: boolean;
  native?: boolean;
  SvgComponent?: JSXElementConstructor<any>;
  PathComponent?: JSXElementConstructor<any>;
  style?: CSSProperties;
}

interface IcoMoonProps extends IconProps {
  iconSet: IconSet;
}

const IcoMoon = ({
  iconSet,
  icon,
  size,
  title,
  disableFill,
  removeInlineStyle,
  native,
  SvgComponent,
  PathComponent,
  ...props
}: IcoMoonProps) => {
  if (!iconSet || !icon) return null;

  const currentIcon = iconSet.icons.find(
    (item) => item.properties.name === icon
  );

  if (!currentIcon) return null;

  const initialStyle: CSSProperties = {
    display: "inline-block",
    stroke: "currentColor",
    fill: "currentColor",
  };

  if (native) {
    initialStyle.display = "flex";
    initialStyle.flexDirection = "row";
    initialStyle.flexWrap = "wrap";
  }

  const comptuedStyle = {
    ...(removeInlineStyle ? {} : initialStyle),
    ...(size ? { width: size, height: size } : {}),
    ...(props.style || {}),
  };

  const { width = "1024" } = currentIcon.icon;

  const viewBox = `0 0 ${width} 1024`;

  const children = currentIcon.icon.paths.map((path, index) => {
    const attrs = currentIcon.icon.attrs?.[index];

    const pathProps = {
      d: path,
      key: icon + index,
      ...(!disableFill && attrs ? attrs : {}),
    };

    return createElement(PathComponent || "path", pathProps);
  });

  if (title && !native) {
    children.push(createElement("title", { key: title }, title));
  }

  return createElement(
    SvgComponent || "svg",
    { ...props, viewBox, style: comptuedStyle },
    children
  );
}

const iconList = (iconSet: IconSet) => {
  if (!iconSet || !Array.isArray(iconSet.icons)) return null;

  return iconSet.icons.map((icon) => icon.properties.name);
}

export {
    IconSetItem,
    IconSet,
    IconProps,
    IcoMoonProps,
    IcoMoon,
    iconList
}
