<template>
    <div 
      class="person-item">
      <div>
        <router-link to="/"> На главную </router-link>
      </div>
      <h1>
        {{person.fullName}}
      </h1>
      <p>
        <a :href="person.linkedIn">Linked In</a>
      </p>
      <p>
       <router-link :to="`/person/${person.id}`"> В профиль </router-link>
      </p>
      <div class="img-wrapper">
        <img :src="`/img/AnyConv.com__photo-${person.id}.jpg`" alt="avatar">
      </div>
    </div>

</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {

  setup():Record<string, unknown> {
    const id = +useRoute().params.id - 1;
    const store = useStore();
    const person = computed(() => store.getters.getPeopleList[id]);

    return {
      person
    }
  }
}
</script>


<style lang="scss">
.img-wrapper {
  max-width: 400px;
}
</style>