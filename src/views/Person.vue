<template>
    <div class="person-item">
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
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {

  setup():Record<string, unknown> {
    const id = +useRoute().params.id - 1;
    const store = useStore();
    const person = computed(() => store.getters.getPersonByID(id));
    // const theList = computed(() => store.getters.getFullPeopleList);

    onMounted(()=> {
      console.log(person.value)
    })

    return {
      person
    }
  }
}
</script>


<style lang="scss">

.person-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-wrapper {
  max-width: 400px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>