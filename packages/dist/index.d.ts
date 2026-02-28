import { App } from 'vue';
import { ButtonEmits as ButtonEmits_2 } from 'element-plus';
import { ButtonProps as ButtonProps_2 } from 'element-plus';
import { ButtonType } from 'element-plus';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComponentSize } from 'element-plus';
import { DefineComponent } from 'vue';
import { InputEmits } from 'element-plus';
import { InputInstance } from 'element-plus';
import { InputProps } from 'element-plus';
import { PublicProps } from 'vue';
import { RemovableRef } from '@vueuse/core';

declare const __VLS_component: DefineComponent<ButtonProps_2, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ButtonProps_2> & Readonly<{}>, {
size: ComponentSize;
type: ButtonType;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_component_2: DefineComponent<    {}, {
clear: () => void;
select: () => void;
focus: () => void;
blur: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, any, any>;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare function __VLS_template_2(): any;

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_TemplateResult_2 = ReturnType<typeof __VLS_template_2>;

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

export declare const MyButton: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare const MyInput: __VLS_WithTemplateSlots_2<typeof __VLS_component_2, __VLS_TemplateResult_2["slots"]>;

export declare interface MyInputExpose {
    clear: () => void;
    select: () => void;
    focus: () => void;
    blur: () => void;
}

export declare function useTheme(): {
    theme: RemovableRef<string>;
    toggleTheme: (newTheme: string) => void;
    applyTheme: () => void;
};

export { }
