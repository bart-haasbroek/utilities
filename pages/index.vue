<template>
  <div class="page-wrapper content-wrapper">
    <app-grid :columns="3">
      <b-card title="Card title" sub-title="Card subtitle">
        <NuxtLink
          :to="{ name: 'utilities-name', params: { name: 'artist-search' } }"
        >
          Navigeer
        </NuxtLink>
      </b-card>
      <b-card title="Card title" sub-title="Card subtitle">
        <b-card-text>
          Some quick example text to build on the <em>card title</em> and make
          up the bulk of the card's content.
        </b-card-text>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        <a href="#" class="card-link">Card link</a>
        <b-link href="#" class="card-link">Another link</b-link>
      </b-card>
      <b-card title="Card title" sub-title="Card subtitle">
        <b-card-text>
          Some quick example text to build on the <em>card title</em> and make
          up the bulk of the card's content.
        </b-card-text>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        <a href="#" class="card-link">Card link</a>
        <b-link href="#" class="card-link">Another link</b-link>
      </b-card>
    </app-grid>
  </div>
</template>

<script>
export default {};
</script>
