<script>
  import { fabric } from 'fabric'
  import ImageLoader from './ImageLoader.svelte'
  import AddHeadButton from './AddHeadButton.svelte'
  import Canvas from './Canvas.svelte'
  import Image from './Image.svelte'
  import Head from './Head.svelte'
  import Footer from './Footer.svelte'
  import images from './images'

  let canvas, image, scale, heads = []
  let result
  let flip = false


  function handleKeydown (e) {
    if (e.which === 8 || e.which === 46) { // backspace or delete key
      deleteSelected()
    }
  }

  function deleteSelected () {
    const activeObjects = canvas.getActiveObjects()
    activeObjects.forEach(activeObject => {
      if (activeObject.head) {
        heads = heads.filter(head => head.id !== activeObject.head.id)
      }
    })
  }

  function replaceImage (e) {
    image = e.detail.image
    heads = []
  }

  function addHead (e) {
    heads = [...heads, e.detail.head]
  }

  function output () {
    const width = image ? image.width : canvas.width
    const height = image ? image.height : canvas.height


    result = canvas.toDataURL({
      format: 'png',
      multiplier: 1 / scale,
      width: width * scale,
      height: height * scale
    })
  }

  function clearResult () {
    result = null
  }

  function restart() {
    heads = []
  }

  function reverse() {
    flip = !flip
    let nodes = document.getElementsByClassName('add-head-button')
    for(let element of nodes) {
      if(flip) {
        element.style.transform = 'rotateY(180deg)'
      } else {
        element.style.transform = ''
      }
    };
  }

</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css">
</svelte:head>

<svelte:body on:keydown={handleKeydown} />

<style>
  .result {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: white;
    overflow-y: auto;
    z-index: 10;
  }

  .images {
    width: 100%;
  }

  .d-flex {
    flex-direction: column;
  }

  .footer {
    margin-bottom: 50px;
  }

</style>

<div class='container'>
  <h4 class="text-center my-3 font-weight-bold">接头霸王 <span class="badge badge-secondary">New</span></h4>
  <div class='form-row text-center'>
    <div class='col'>
      <div class="my-3">第一步, 选择图片:</div>
      <ImageLoader on:load={replaceImage} />
      <div class="my-3">第二步, 添加头部:</div>
    </div>
  </div>

  <div class='d-flex'>
    <div class='images border p-1 rounded-lg'>
      <div class='flex-wrap'>
        {#each images as image}
          <AddHeadButton source={image} on:add={addHead} />
        {/each}
      </div>
    </div>

    <div class="flex-row d-flex justify-content-center my-3">
      <div class="col text-center">
        <button class='btn btn-outline-secondary' on:click={restart}>
          清空头部
        </button>
      </div>

      <div class="col text-center"> 
        <button class='btn btn-outline-secondary' on:click={reverse}>
          图片反转
        </button>
      </div>
    </div>

    <div class='flex-fill my-3'>
      <Canvas bind:canvas/>
    </div>
  </div>

  <div class='form-row text-center'>
    <div class='col'>
      <div class="mb-3">最后, 保存并分享:</div>
      <button class='btn btn-outline-secondary' on:click={output}>
        重获新生
      </button>
    </div>
  </div>

  <Footer />

  {#if canvas}
    {#if image}
      {#each [image] as image (image.src)}
        <Image {canvas} {image} bind:scale />
      {/each}
    {/if}

    {#each heads as head (head.id)}
      <Head {canvas} {head} {flip}/>
    {/each}
  {/if}
</div>

{#if result}
  <div class='result'>
    <div class='container'>
      <div class='d-flex mb-3'>
        <div class='flex-fill text-center my-3'>完成了! 请长按保存:</div>
        <button class='btn btn-primary' on:click={clearResult}>继续迫害</button>
      </div>
      <img src={result} style='max-width: 100%;'/>
    </div>
  </div>
{/if}
