<template>
  <div>
    <!--    <input ref="fileInputRef" class="form-control" type="file" @change="handleImage" accept="image/x-png,image/jpeg,image/gif">-->

    <div class="custom-file">
      <div class="input-group custom-file-button">
        <label class="input-group-text" for="inputGroupFile">{{ fileName }}</label>
        <input
            ref="fileInputRef"
            class="form-control"
            type="file"
            @change="handleImage"
            accept="image/x-png,image/jpeg,image/gif"
            id="customFile"
        />
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'ImageInput',

  data() {
    return {
      imageData: String,
      fileName: "Pilt"
    }
  },
  methods: {
    handleImage(event) {
      const selectedImage = event.target.files[0];
      if (selectedImage) {
        this.fileName = "Pildi lisamine";
      } else {
        this.fileName = "Pilt";
      }
      this.emitNewImageData(selectedImage);
    },

    emitNewImageData(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result;
        this.$emit('event-new-image-file-selected', this.imageData)
      }
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    },

    clearImageInput() {
      this.$refs.fileInputRef.value = '';
    },
  }
}

</script>