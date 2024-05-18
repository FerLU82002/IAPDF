<script>
  import { SetAppStatusLoading, SetAppStatusError, SetAppStatusChatMode } from "../pages/store.ts";
  import Dropzone from "svelte-file-dropzone";
  import { Alert } from "flowbite-svelte";

  let files = {
      accepted: [],
      rejected: []
  };

  async function handleFilesSelect(e) {
      const { acceptedFiles, fileRejections } = e.detail;

      files.accepted = [...files.accepted, ...acceptedFiles];
      files.rejected = [...files.rejected, ...fileRejections];

      if (acceptedFiles.length > 0) {
          const formData = new FormData();
          formData.append("file", acceptedFiles[0]);

          try {
              const res = await fetch('/api/upload', {
                  method: "POST",
                  body: formData
              });

              if (!res.ok) {
                  SetAppStatusError();
                  return;
              }

              const result = await res.json();
              console.log(result);
              SetAppStatusChatMode(result);
              
          } catch (error) {
              console.error("Error al procesar la solicitud:", error);
              SetAppStatusError();
          }

          SetAppStatusLoading();
      }
  }
</script>

{#if files.accepted.length === 0}
  <Dropzone multiple={false} accept="application/pdf" on:drop={handleFilesSelect}>
        Arrastra y suelta aquí tu PDF
  </Dropzone>
{:else}
  <ol>
      {#each files.accepted as item}
          <li>{item.name}</li>
      {/each}
  </ol>
{/if}
