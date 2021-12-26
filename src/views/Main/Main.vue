<template src="./mainPageTemplate.html"></template>
<style lang="scss" src="./mainPageStyles.scss"></style>

<script lang="ts">
import { computed, ComputedRef, onMounted, ref, watch } from 'vue';
import { Person } from '../../types/types';
import peopleList from '../../api/getPeople'
export default ({
  
  setup():Record<string, unknown> {

    // Reactive Variables
    const currentPage = ref(1);
    const pageSize = ref(8);
    const nameFilter = ref("");
    const jobFilter = ref("");
    const list = ref();
    const listOfPeople: Person[] = peopleList

    // Watch & Computed
    const isFilterOn = computed(() => {
      return !!(nameFilter.value.length || jobFilter.value.length)
    });
    const filteredListOfPeople:ComputedRef<Person[]> = computed(() => {
      const result =  listOfPeople
        .filter((person: { fullName: string|string[]; }) => {
          let name = String(person.fullName).toLowerCase();
          if (nameFilter.value.length > 1) return name.includes(nameFilter.value.toLowerCase())
          return true
        })
        .filter((person: { job: string|string[]; }) => {
          const job = String(person.job).toLowerCase();
          if (jobFilter.value.length > 1) return job.includes(jobFilter.value.toLowerCase())
          return true
        });
        // console.log(result)
        return result
    });
    const paginationCount = computed(() => filteredListOfPeople.value.length);
    const peopleToShow = computed(() => {
      const startPoint = currentPage.value === 1 ? 0 : currentPage.value*pageSize.value - pageSize.value;
      const endPoint = startPoint + pageSize.value;
      return filteredListOfPeople.value.slice(startPoint, endPoint)
    });    

    watch(nameFilter, (count, prevCount) => {
      currentPage.value = 1
    });
    watch(jobFilter, (count, prevCount) => {
      currentPage.value = 1
    });

    // Lifecycle Hooks
    onMounted(() => {
      console.log(list.value.clientHeight)
    });
    
    // Methods
    const newpage = (e: any) => {
      currentPage.value = e;
    };
    const clearHandler = () => {
      nameFilter.value = "";
      jobFilter.value = "";
    };
    
    return {
      nameFilter,
      jobFilter,
      filteredListOfPeople,
      clearHandler,
      newpage,
      peopleToShow,
      paginationCount,
      currentPage,
      pageSize,
      isFilterOn,
      list
    }
  }
});
</script>
