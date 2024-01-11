import type { ComponentProps } from 'react';
import type { GuiSetting } from './property-listener';
import type { ModelConstructor, RenderModel } from '../rendering/render-model';
import type { CheckboxProps, FileUploadProps, SliderProps } from '../components/core';

type SettingWrapper<BaseType> = Omit<BaseType, 'label' | 'callbacks' | 'onChange'>;

export type SliderSetting = GuiSetting<SettingWrapper<SliderProps>, 'slider'>;
export type CheckboxSetting = GuiSetting<SettingWrapper<CheckboxProps>, 'checkbox'>;
export type FileUploadSetting = GuiSetting<SettingWrapper<FileUploadProps<unknown>>, 'file'>;
export type ButtonSetting = GuiSetting<ComponentProps<'button'>, 'button'>;

export type ModelSetting =
    SliderSetting
    | CheckboxSetting
    | ButtonSetting
    | FileUploadSetting;

export type FullSettings = {
    privateSettings: Record<string, ModelSetting>,
    publicSettings: Record<string, ModelSetting>,
};

export type FullRenderModel = RenderModel & { settings: Record<string, ModelSetting> };

export type FullModelConstructor =
    new(...args: ConstructorParameters<ModelConstructor>) => FullRenderModel;

export type LoadModelConstructor = () => Promise<FullModelConstructor>;
