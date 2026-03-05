import { App } from 'vue';
import { ButtonEmits as ButtonEmits_2 } from 'element-plus';
import { ButtonProps as ButtonProps_2 } from 'element-plus';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { InputEmits } from 'element-plus';
import { InputInstance } from 'element-plus';
import { InputProps } from 'element-plus';
import { PublicProps } from 'vue';
import { RadioButtonProps } from 'element-plus';
import { default as YoButton } from './button/button.vue';

declare const __VLS_component: DefineComponent<    {}, {
clear: () => void;
select: () => void;
focus: () => void;
blur: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, any, any>;

declare const __VLS_component_2: DefineComponent<searchProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
search: (v: string) => any;
advancedSearch: () => any;
}, string, PublicProps, Readonly<searchProps> & Readonly<{
onSearch?: ((v: string) => any) | undefined;
onAdvancedSearch?: (() => any) | undefined;
}>, {
type: string;
placeholder: string;
width: string;
isSearchModel: boolean;
buttonType: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_component_3: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

declare const __VLS_component_4: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

declare const __VLS_component_5: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

declare function __VLS_template(): any;

declare function __VLS_template_2(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare function __VLS_template_3(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare function __VLS_template_4(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare function __VLS_template_5(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_TemplateResult_2 = ReturnType<typeof __VLS_template_2>;

declare type __VLS_TemplateResult_3 = ReturnType<typeof __VLS_template_3>;

declare type __VLS_TemplateResult_4 = ReturnType<typeof __VLS_template_4>;

declare type __VLS_TemplateResult_5 = ReturnType<typeof __VLS_template_5>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_2<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_3<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_4<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_5<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare type ButtonEmits = ButtonEmits_2;

export declare type ButtonProps = ButtonProps_2;

export declare const componentList: string[];

declare const _default: {
    install(app: App): void;
};
export default _default;

export { InputEmits }

export { InputInstance }

export { InputProps }

export declare interface MyInputExpose {
    clear: () => void;
    select: () => void;
    focus: () => void;
    blur: () => void;
}

export declare type MyRadioButtonProps = RadioButtonProps;

export declare type searchEmits = {
    (e: 'search', v: string): void;
    (e: 'advancedSearch'): void;
};

export declare type searchProps = {
    width?: string;
    placeholder?: string;
    isSearchModel?: boolean;
    buttonType?: string;
    type?: string;
};

export { YoButton }

export declare const YoInput: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare const YoRadio: __VLS_WithTemplateSlots_4<typeof __VLS_component_4, __VLS_TemplateResult_4["slots"]>;

export declare const YoRadioButton: __VLS_WithTemplateSlots_5<typeof __VLS_component_5, __VLS_TemplateResult_5["slots"]>;

export declare const YoRadioGroup: __VLS_WithTemplateSlots_3<typeof __VLS_component_3, __VLS_TemplateResult_3["slots"]>;

export declare const YoSearch: __VLS_WithTemplateSlots_2<typeof __VLS_component_2, __VLS_TemplateResult_2["slots"]>;

export declare const YoTitle: DefineComponent<YoTitleProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<YoTitleProps> & Readonly<{}>, {
content: string;
titleLevel: "1" | "2" | "3" | 1 | 2 | 3;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare type YoTitleProps = {
    content: string;
    titleLevel?: "1" | "2" | "3" | 1 | 2 | 3;
};

export { }
