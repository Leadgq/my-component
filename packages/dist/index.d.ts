import { ButtonEmits as ButtonEmits_2 } from 'element-plus';
import { ButtonProps as ButtonProps_2 } from 'element-plus';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { InputEmits } from 'element-plus';
import { InputInstance } from 'element-plus';
import { InputProps } from 'element-plus';
import { PublicProps } from 'vue';
import { searchProps } from './search.ts';
import { default as YoButton } from './button/button.vue';

declare const __VLS_component: DefineComponent<    {}, {
clear: () => void;
select: () => void;
focus: () => void;
blur: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, any, any>;

declare function __VLS_template(): any;

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare type ButtonEmits = ButtonEmits_2;

export declare type ButtonProps = ButtonProps_2;

export declare const componentList: string[];

export { InputEmits }

export { InputInstance }

export { InputProps }

export declare interface MyInputExpose {
    clear: () => void;
    select: () => void;
    focus: () => void;
    blur: () => void;
}

export { YoButton }

export declare const YoInput: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare const YoSearch: DefineComponent<searchProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
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

export { }
