<script>
    import { appStatus, SetAppStatusLoading } from "../pages/store.ts";
    import Dropzone from "svelte-file-dropzone";
    import { Alert } from "flowbite-svelte";
  
    let files = {
      accepted: [],
      rejected: []
    };
  
    function handleFilesSelect(e) {
      const { acceptedFiles, fileRejections } = e.detail;
     
      files.accepted = [...files.accepted, ...acceptedFiles];
      files.rejected = [...files.rejected, ...fileRejections];

      if(acceptedFiles.length > 0){
        SetAppStatusLoading()
      }
    }
  </script>
  
  <Dropzone multiple={false} accept="application/pdf" on:drop={handleFilesSelect}>
          Arrastra y suelta aquí tu PDF
  </Dropzone>
  <ol>
    {#each files.accepted as item}
      <li>{item.name}</li>
    {/each}
  </ol>

   