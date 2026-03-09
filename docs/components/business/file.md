# 文件相关
 文件相关

<script setup>
import { ref } from 'vue'
import { usePictureView,YoButton, useFileView} from '../../../packages/dist/index.js'
import '../../../packages/dist/style.css'
import pdf from '/test.pdf'

 const {previewFile,downLoadFille} = useFileView();

function openPreview() {
  const { showPicture, showPictures, destroyViewJs } = usePictureView();

  showPicture({
    src:"https://img0.baidu.com/it/u=3591665277,2616537962&fm=253&app=138&f=JPEG?w=800&h=133"
  })
}

function openFilePreview(){
 previewFile({
    src: pdf
  })
}

function down() {
  downLoadFille(pdf, 'test.pdf');
}

function previewFileAndDownLoad() {
  previewFile({
    src: pdf,
    fileName: "test.pdf",
    down: true,
  });
}
</script>

<YoButton @click="openPreview">打开预览</YoButton>

```vue
<YoButton @click="openPreview">打开预览</YoButton>

<script setup>
import { ref } from "vue";
import { usePictureView, YoButton } from "../../../packages/dist/index.js";

function openPreview() {
  const { showPicture, showPictures, destroyViewJs } = usePictureView();

  showPicture({
    src: "https://img0.baidu.com/it/u=3591665277,2616537962&fm=253&app=138&f=JPEG?w=800&h=133",
  });
}
</script>
```

## 预览文件

<YoButton @click="openFilePreview">打开文件预览</YoButton>

```vue
<YoButton @click="openFilePreview">打开文件预览</YoButton>

<script setup>
import { ref } from "vue";
import { useFileView, YoButton } from "../../../packages/dist/index.js";
import pdf from "/test.pdf"; // 可以是网络文件

const { previewFile } = useFileView();

function openFilePreview() {
  previewFile({
    src: pdf,
  });
}
</script>
```

## 下载文件

<YoButton @click="down">下载文件</YoButton>

```vue
<YoButton @click="down">下载文件</YoButton>

<script setup>
import { ref } from "vue";
import { useFileView, YoButton } from "../../../packages/dist/index.js";
import pdf from "/test.pdf"; // 可以是网络文件

const { downLoadFille } = useFileView();

function down() {
  downLoadFille(pdf, "test.pdf");
}
</script>
```

## 下载文件方式2

<YoButton @click="previewFileAndDownLoad">下载文件</YoButton>

```vue
<YoButton @click="previewFileAndDownLoad">下载文件</YoButton>

<script setup>
import { ref } from "vue";
import { useFileView, YoButton } from "../../../packages/dist/index.js";
import pdf from "/test.pdf"; // 可以是网络文件

const { downLoadFille } = useFileView();

function previewFileAndDownLoad() {
  previewFile({
    src: pdf,
    fileName: "test.pdf",
    down: true,
  });
}
</script>
```

## 图片预览具体参数

- usePictureView
- 传递方式必须是对象

| 参数            | 说明                 | 类型              | 默认值                   |
| --------------- | -------------------- | ----------------- | ------------------------ |
| `showPicture`   | 展示一张图片         | `object`          | `{src:'',options:{}}`    |
| `showPictures`  | 展示多张图片         | `array,prevIndex` | `[{src:''}, {src:''},0]` |
| `destroyViewJs` | 销毁预览、可手动调用 | `function`        | `()=>{}`                 |

## 文件预览具体参数

- useFileView
- 传递方式必须是对象

| 参数            | 说明     | 类型       | 默认值                            |
| --------------- | -------- | ---------- | --------------------------------- |
| `previewFile`   | 预览文件 | `object`   | `{src:'',fileName:'',down:false}` |
| `downLoadFille` | 下载文件 | `function` | `(src, fileName)=>{}`             |
| `downLoadFille` | 下载文件 | `function` | `(src, fileName)=>{}`             | -->
