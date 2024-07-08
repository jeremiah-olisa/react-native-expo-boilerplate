// import { vars } from "nativewind";

import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export const STYLE_SCOPES = {
    /** @description Style is the same globally */
    GLOBAL: 0,
    /** @description Style is the same within a context (variables / containers) */
    CONTEXT: 1,
    /** @description Style can affect other styles (sets variables, uses other styles) */
    SELF: 2,
};

export type PropRuntimeValueDescriptor = {
    $$type: "prop";
    value: RuntimeValueDescriptor;
};

export type Specificity = {
    /** IDs - https://drafts.csswg.org/selectors/#specificity-rules */
    A: number;
    /** Classes, Attributes, Pseudo-Classes - https://drafts.csswg.org/selectors/#specificity-rules */
    B: number;
    /** Elements, Pseudo-Elements - https://drafts.csswg.org/selectors/#specificity-rules */
    C: number;
    /** Importance - https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#cascading_order */
    I: number;
    /** StyleSheet Order */
    S: number;
    /** Appearance Order */
    O: number;
    /** Inline */
    inline?: number;
};
export type CompilerStyleMeta = {
    specificity: Specificity;
    media?: any[];
    variables?: Array<[string, RuntimeValueDescriptor]>;
    pseudoClasses?: any;
    animations?: any;
    container?: Partial<any>;
    containerQuery?: any[];
    transition?: any;
    requiresLayoutWidth?: boolean;
    requiresLayoutHeight?: boolean;
    props: Record<string, Record<string, RuntimeValueDescriptor>>;
    propSingleValue: Record<string, PropRuntimeValueDescriptor>;
    attrs?: any[];
    hoistedStyles?: [string, string, any][];
    scope: number;
    warnings?: any[];
};

export type TransportStyle = Omit<
    CompilerStyleMeta,
    "props" | "propSingleValue"
> & {
    props?: Array<
        [
            string,
            PropRuntimeValueDescriptor | Array<[string, RuntimeValueDescriptor]>,
        ]
    >;
};

export type Style = ViewStyle & TextStyle & ImageStyle;
export type StyleProp = Style | StyleProp[] | undefined;

export type RuntimeValueDescriptor =
    | string
    | number
    | {
        name: string;
        arguments: any[];
    };

export type RuntimeValue =
    | string
    | number
    | boolean
    | undefined
    | (() => RuntimeValue);

export type RuntimeStyle = Omit<TransportStyle, "props"> & {
    $$type: "runtime";
    props?: Array<[string, RuntimeValue | Record<string, RuntimeValue>]>;
};

export type GroupedRuntimeStyle = {
    0?: RuntimeStyle[];
    1?: RuntimeStyle[];
    2?: RuntimeStyle[];
    scope: number;
};
export const opaqueStyles = new WeakMap<object, GroupedRuntimeStyle>();

// export function vars(variables: Record<string, RuntimeValueDescriptor>) {
//     const style: StyleProp = {};
//     opaqueStyles.set(style, {
//         scope: STYLE_SCOPES.SELF,
//         1: [
//             {
//                 $$type: "runtime",
//                 scope: STYLE_SCOPES.SELF,
//                 variables: Object.entries(variables).map(([name, value]) => {
//                     return [name.startsWith("--") ? name : `--${name}`, value];
//                 }),
//                 specificity: {
//                     A: 0,
//                     B: 0,
//                     C: 0,
//                     I: 0,
//                     O: 0,
//                     S: 0,
//                     inline: 1,
//                 },
//             },
//         ],
//     });
//     return style;
// }

const vars = (_vars: Record<string, string>) => _vars


export const colorThemes = {
    light: vars({
        "--background": "0 0% 100%",
        "--foreground": "240 10% 3.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "240 10% 3.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "240 10% 3.9%",
        "--primary": "240 5.9% 10%",
        "--primary-foreground": "0 0% 98%",
        "--secondary": "240 4.8% 95.9%",
        "--secondary-foreground": "240 5.9% 10%",
        "--muted": "240 4.8% 95.9%",
        "--muted-foreground": "240 3.8% 46.1%",
        "--accent": "240 4.8% 95.9%",
        "--accent-foreground": "240 5.9% 10%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "0 0% 98%",
        "--border": "240 5.9% 90%",
        "--input": "240 5.9% 90%",
        "--ring": "240 5.9% 10%",
    }),
    dark: vars({
        "--background": "240 10% 3.9%",
        "--foreground": "0 0% 98%",
        "--card": "240 10% 3.9%",
        "--card-foreground": "0 0% 98%",
        "--popover": "240 10% 3.9%",
        "--popover-foreground": "0 0% 98%",
        "--primary": "0 0% 98%",
        "--primary-foreground": "240 5.9% 10%",
        "--secondary": "240 3.7% 15.9%",
        "--secondary-foreground": "0 0% 98%",
        "--muted": "240 3.7% 15.9%",
        "--muted-foreground": "240 5% 64.9%",
        "--accent": "240 3.7% 15.9%",
        "--accent-foreground": "0 0% 98%",
        "--destructive": "0 72% 51%",
        "--destructive-foreground": "0 0% 98%",
        "--border": "240 3.7% 15.9%",
        "--input": "240 3.7% 15.9%",
        "--ring": "240 4.9% 83.9%",
    }),
};