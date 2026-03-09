# 文件相关

文件相关

<script setup>
import { ref } from 'vue'
import { usePictureView,YoButton, useFileView} from '../../../packages/dist/index.js'
import '../../../packages/dist/style.css'
import pdf from '/test.pdf'


function openPreview() {
  const { showPicture, showPictures, destroyViewJs } = usePictureView();

  showPicture({
    src:"https://img0.baidu.com/it/u=3591665277,2616537962&fm=253&app=138&f=JPEG?w=800&h=133"
  })
}

function openFilePreview(){
 const {previewFile} = useFileView();
 previewFile({
    src: pdf
  })
}

function down() {
  const {downLoadFille} = useFileView();
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

function openFilePreview() {
  const { previewFile } = useFileView();
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

function down() {
  const { downLoadFille } = useFileView();
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

function previewFileAndDownLoad() {
  const { downLoadFille } = useFileView();
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

- **注意**：如果预览的非 PDF 文件（如 `.docx`, `.xlsx`, `.pptx` 等 Office 文件），**必须使用完整的网络直链地址**，且服务端必须允许跨域（CORS）。

  **原因：**
  现代的 Office 文件（`.docx` / `.xlsx` / `.pptx` 等）本质上是 ZIP 压缩包格式。
  底层渲染引擎在工作时，会通过 `fetch` 请求该文件的完整二进制流（ArrayBuffer），然后使用 ZIP 解析库（如 `jszip`）对其进行解压。
  如果地址存在**跨域限制**，或者该地址实际上返回的是一个 **HTML 网页**（例如本地开发环境下的拦截返回，或是百度网盘等分享页），引擎将无法获取到真正的 ZIP 结构二进制数据，从而导致解压失败并报出 `Can't find end of central directory : is this a zip file ?` 类似的严重错误。
  （注：PDF 格式由于支持流式加载且非 ZIP 包结构，因此没有这种严格的解压校验限制）