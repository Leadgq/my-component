import { App } from 'vue';
import { ButtonEmits as ButtonEmits_2 } from 'element-plus';
import { ButtonProps as ButtonProps_2 } from 'element-plus';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { InputEmits } from 'element-plus';
import { InputInstance } from 'element-plus';
import { InputProps } from 'element-plus';
import { default as MyButton } from './components/button/button.vue';
import { PublicProps } from 'vue';

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

export declare interface ButtonProps extends ButtonProps_2 {
    /**
     * 按钮标记
     */
    badge?: string | number;
    /**
     * 标记类型
     */
    badgeType?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    /**
     * 标记位置
     */
    badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    /**
     * 标记是否为点
     */
    badgeIsDot?: boolean;
    /**
     * 是否显示标记
     */
    isShowBadge?: boolean;
}

export declare const componentList: string[];

declare const _default: {
    install(app: App): void;
};
export default _default;

export { InputEmits }

export { InputInstance }

export { InputProps }

export { MyButton }

export declare const MyInput: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare interface MyInputExpose {
    clear: () => void;
    select: () => void;
    focus: () => void;
    blur: () => void;
}

export { }
