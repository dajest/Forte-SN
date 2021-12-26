<template>
  <div class="app-wrapper">
    <div class="filtering">
      <var-card class="no-padd">
        <template #extra>
          <var-input class="filter-field" placeholder="Search by name" v-model="nameFilter" />
          <var-input class="filter-field" placeholder="Search by Job" v-model="jobFilter" />
          <div class="filter-action-block">
            <var-button @click="clearHandler" type="success">Clear</var-button>
          </div>
        </template>
      </var-card>      

    </div>

    <div class="container">
      <div v-if="peopleToShow.length" class="wrapper">
        <div class="list-of-people">
          <div
            v-for="(person, idx) in peopleToShow"
            :key="idx" 
            class="person-item var-elevation--6">

            <div class="img-wrapper">
              <img :src="`/img/AnyConv.com__photo-${person.id}.jpg`" alt="avatar">
            </div>
            <h3>
              {{person.fullName}}
            </h3>
            <p>
              <a :href="person.linkedIn">Linked In</a>
            </p>
            <p>
            <router-link :to="`/person/${person.id}`"> В профиль </router-link>
            </p>
          </div>
        </div>

        <div class="pagination">
          <var-pagination 
            @change="newpage($event)" 
            :size="pageSize" 
            :current="currentPage" 
            :total="paginationCount" 
            :simple="false" 
            :show-size-changer="false"/>
        </div>
      </div>
      <div class="error-message" v-else>
        <h1>
          There is no match
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, ref, Ref, watch } from 'vue';
import { Person } from '../types/types'
export default ({
  
  setup():Record<string, unknown> {
    let currentPage = ref(1);
    let pageSize = ref(8);

    let listOfPeople: Person[]= [
      {
        id: 1,
        photoUrl: "AnyConv.com__photo-1.jpg",
        linkedIn: "https://www.linkedin.com/in/dmitry-putyrski-820477a2/",
        fullName: 'Dmitry Putyrskiares',
        job: "qa"
      },
      
      {
        id: 2,
        photoUrl: "AnyConv.com__photo-2.jpg",
        linkedIn: "https://www.linkedin.com/in/vasili-ivus-9a521297/",
        fullName: 'Vasili Ivus',
        job: 'Principal Architect'
      },
      
      {
        id: 3,
        photoUrl: "AnyConv.com__photo-3.jpg",
        linkedIn: "https://www.linkedin.com/in/denis-orlov-134434153/",
        fullName: 'Denis Orlov',
        job: 'Full-Stack JavaScript Developer'
      },
      
      {
        id: 4,
        photoUrl: "AnyConv.com__photo-4.jpg",
        linkedIn: "https://www.linkedin.com/in/alina-nesterenko-3a6567214/",
        fullName: 'Alina Nesterenkores',
        job: ""
      },
      
      {
        id: 5,
        photoUrl: "AnyConv.com__photo-5.jpg",
        linkedIn: "https://www.linkedin.com/in/maria-kovaleva-a63228215/",
        fullName: 'Maria Kovalevaares',
        job: "qa"
        // job: "HR Specialist"
      },
      
      {
        id: 6,
        photoUrl: "AnyConv.com__photo-6.jpg",
        linkedIn: "https://www.linkedin.com/in/tatiana-gutnik/",
        fullName: 'Tatiana Gutnikares',
        job: "Technical Writer"
      },
      
      {
        id: 7,
        photoUrl: "AnyConv.com__photo-7.jpg",
        linkedIn: "https://www.linkedin.com/in/martinrogachevsky/",
        fullName: 'Martin Rogachevskyares',
        job: ".NET Developer"
      },
      
      {
        id: 8,
        photoUrl: "AnyConv.com__photo-8.jpg",
        linkedIn: "https://www.linkedin.com/in/tatyana-kornyukhova-57189889/",
        fullName: 'Tatyana Kornyukhovaares',
        job: "BA Lead"
      },
      
      {
        id: 9,
        photoUrl: "AnyConv.com__photo-9.jpg",
        linkedIn: "https://www.linkedin.com/in/darya-kunickaya-644804178/",
        fullName: 'Darya Kunickayaares',
        job: ".Net developer"
      },
      
      {
        id: 10,
        photoUrl: "AnyConv.com__photo-10.jpg",
        linkedIn: "https://www.linkedin.com/in/angelina-melguy-38a880216/",
        fullName: 'Angelina Melguyares',
        job: "Employer Brand Specialist"
      },
      
      {
        id: 11,
        photoUrl: "AnyConv.com__photo-11.jpg",
        linkedIn: "https://www.linkedin.com/in/konstantin-borovik-a36930176/",
        fullName: 'Konstantin Borovikres',
        job: 'Software Developer'
      },
      
      {
        id: 12,
        photoUrl: "AnyConv.com__photo-12.jpg",
        linkedIn: "https://www.linkedin.com/in/olgafiodorova/",
        fullName: 'Olga Fiodorovares',
        job: 'Employer Brand Manager'
      },
      
      {
        id: 13,
        photoUrl: "AnyConv.com__photo-13.jpg",
        linkedIn: "https://www.linkedin.com/in/ivan-rymsha-153b61160/",
        fullName: 'Ivan Rymsha',
        job: "System Administrator"
      },
      
      {
        id: 14,
        photoUrl: "AnyConv.com__photo-14.jpg",
        linkedIn: "https://www.linkedin.com/in/veronika-lukyanchuck-75b98959/",
        fullName: 'Veronika Lukyanchuck',
        job: "Corporate English Instructor"
      },
      
      {
        id: 15,
        photoUrl: "AnyConv.com__photo-15.jpg",
        linkedIn: "https://www.linkedin.com/in/artsiom-lysou-21b176176/",
        fullName: 'Artsiom Lysou',
        job: "Salesforce developer"
      },
      
      {
        id: 16,
        photoUrl: "AnyConv.com__photo-16.jpg",
        linkedIn: "https://www.linkedin.com/in/inna-bernatskaya-001204177/",
        fullName: 'Inna Bernatskaya',
        job: "Salesforce Developer"
      },
      
      {
        id: 17,
        photoUrl: "AnyConv.com__photo-17.jpg",
        linkedIn: "https://www.linkedin.com/in/%D0%B2%D0%B8%D1%82%D1%8F-%D0%BA%D0%BE%D0%B7%D0%B8%D1%8F%D1%82%D0%BA%D0%BE-1b0609183/",
        fullName: 'Витя Козиятко',
        job: "Salesforce Developer"
      },
      
      {
        id: 18,
        photoUrl: "AnyConv.com__photo-18.jpg",
        linkedIn: "https://www.linkedin.com/in/darya-glukhova-345176207/",
        fullName: 'Darya Glukhova',
        job: "IT Researcher"
      },
      
      {
        id: 19,
        photoUrl: "AnyConv.com__photo-19.jpg",
        linkedIn: "https://www.linkedin.com/in/artem-shekrota/",
        fullName: 'Artem Shekrota',
        job: "React Developer"
      },
      
      {
        id: 20,
        photoUrl: "AnyConv.com__photo-20.jpg",
        linkedIn: "https://www.linkedin.com/in/ekaterina-rud/",
        fullName: 'Ekaterina Rud',
        job: "ecruitment Lead"
      },
      
      {
        id: 21,
        photoUrl: "AnyConv.com__photo-21.jpg",
        linkedIn: "https://www.linkedin.com/in/alexey-kastyuk-633372121/",
        fullName: 'Alexey Kastyuk',
        job: "Frontend Developer"
      },
      
      {
        id: 22,
        photoUrl: "AnyConv.com__photo-22.jpg",
        linkedIn: "https://www.linkedin.com/in/helen-pilchenko-335434119/",
        fullName: 'Helen Pilchenko',
        job: "Digital Marketing Manager"
      },
      
      {
        id: 23,
        photoUrl: "AnyConv.com__photo-23.jpg",
        linkedIn: "https://www.linkedin.com/in/nadzeya-ramaniuk-a50b37157/",
        fullName: 'Nadzeya Ramaniuk',
        job: "Business Analyst"
      },
      
      {
        id: 24,
        photoUrl: "AnyConv.com__photo-24.jpg",
        linkedIn: "https://www.linkedin.com/in/oksana-mikhalchuk-a91020140/",
        fullName: 'Oksana Mikhalchuk',
        job: "IT Copywriter"
      },
      
      {
        id: 25,
        photoUrl: "AnyConv.com__photo-25.jpg",
        linkedIn: "https://www.linkedin.com/in/yuliya-khalkova-7825ba176/",
        fullName: 'Yuliya Khalkova',
        job: "Business Development Manager"
      },
      
      {
        id: 26,
        photoUrl: "AnyConv.com__photo-26.jpg",
        linkedIn: "https://www.linkedin.com/in/olga-kardash-ab8b20104/",
        fullName: 'Olga Kardash',
        job: "Senior Product Analyst"
      },
      
      {
        id: 27,
        photoUrl: "AnyConv.com__photo-27.jpg",
        linkedIn: "https://www.linkedin.com/in/mary-shpilevskaya-374769190/",
        fullName: 'Mary Shpilevskaya',
        job: "Salesforce QA Engineer"
      },
      
      {
        id: 28,
        photoUrl: "AnyConv.com__photo-28.jpg",
        linkedIn: "https://www.linkedin.com/in/ekaterina-gurinovich-2b9437147/",
        fullName: 'Ekaterina Gurinovich',
        job: "Resource manager"
      },
      
      {
        id: 29,
        photoUrl: "AnyConv.com__photo-29.jpg",
        linkedIn: "https://www.linkedin.com/in/mreutski/",
        fullName: 'Mike Reutski',
        job: "Senior Product Owner"
      },
      
      {
        id: 30,
        photoUrl: "AnyConv.com__photo-30.jpg",
        linkedIn: "https://www.linkedin.com/in/maxim-paseniuk/",
        fullName: 'Max Paseniuk',
        job: "Delivery Manager"
      },
      
      {
        id: 31,
        photoUrl: "AnyConv.com__photo-31.jpg",
        linkedIn: "https://www.linkedin.com/in/yuliya-zalesskaya-143aa3176/",
        fullName: 'Yuliya Zalesskaya',
        job: "Business Development Manager"
      },
      
      {
        id: 32,
        photoUrl: "AnyConv.com__photo-32.jpg",
        linkedIn: "https://www.linkedin.com/in/yahor-but-husaim/",
        fullName: 'Yahor But-Husaim',
        job: "Senior Software Engineer, Java, E-commerce"
      },
      
      {
        id: 33,
        photoUrl: "AnyConv.com__photo-33.jpg",
        linkedIn: "https://www.linkedin.com/in/kristina-kachur-b301a9172/",
        fullName: 'Kristina Kachur',
        job: "QA Engineer"
      },
      
      {
        id: 34,
        photoUrl: "AnyConv.com__photo-34.jpg",
        linkedIn: "https://www.linkedin.com/in/gennady-zavistovskiy-0439b2105/",
        fullName: 'Gennady Zavistovskiy',
        job: "QA Engineer"
      },
      
      {
        id: 35,
        photoUrl: "AnyConv.com__photo-35.jpg",
        linkedIn: "https://www.linkedin.com/in/viktoriya-chepurnaya-a579281b2/",
        fullName: 'Viktoriya Chepurnaya',
        job: "Front-end Developer"
      },
      
      {
        id: 36,
        photoUrl: "AnyConv.com__photo-36.jpg",
        linkedIn: "https://www.linkedin.com/in/eugene-pankov-74b764140/",
        fullName: 'Eugene Pankov',
        job: "Java Developer"
      },
      
      {
        id: 37,
        photoUrl: "AnyConv.com__photo-37.jpg",
        linkedIn: "https://www.linkedin.com/in/vera-kurhan/",
        fullName: 'Vera Kurhan',
        job: "Recruiter"
      },
      
      {
        id: 38,
        photoUrl: "AnyConv.com__photo-38.jpg",
        linkedIn: "https://www.linkedin.com/in/dmitrij-panasiuk/",
        fullName: 'Dmitrij Panasiuk',
        job: "Frontend Developer"
      },
      
      {
        id: 39,
        photoUrl: "AnyConv.com__photo-39.jpg",
        linkedIn: "https://www.linkedin.com/in/igor-vershal-b0566b175/",
        fullName: 'Igor Vershal',
        job: "Senior Java Software Engineer"
      },
      
      {
        id: 40,
        photoUrl: "AnyConv.com__photo-40.jpg",
        linkedIn: "https://www.linkedin.com/in/anastasia-logvinets-358644135/",
        fullName: 'Anastasia Logvinets',
        job: "Java Developer/Tech Lead"
      }
    ]

    let filteredListOfPeople:ComputedRef<Person[]> = computed(() => {
      let result =  listOfPeople
        .filter((person: { fullName: string|string[]; }) => {
          if (nameFilter.value.length > 1) return person.fullName.includes(nameFilter.value)
          else return person
        })
        .filter((person: { job: string|string[]; }) => {
          if (jobFilter.value.length > 1) return person.job.includes(jobFilter.value)
          else return person
        })
        return result
    })
    let paginationCount = computed(() => filteredListOfPeople.value.length);

    const peopleToShow = computed(() => {
      let startPoint = currentPage.value === 1 ? 0 : currentPage.value*pageSize.value - pageSize.value;
      let endPoint = startPoint + pageSize.value;
      checkPuck(filteredListOfPeople.value.slice(startPoint, endPoint).length)
      return filteredListOfPeople.value.slice(startPoint, endPoint)
    })

    const checkPuck = (numb: number) => {
      console.log(numb)
    }

    const newpage = (e: any) => {
      currentPage.value = e;
    }

    const nameFilter = ref("");
    const jobFilter = ref("");

    const clearHandler = () => {
      nameFilter.value = "";
      jobFilter.value = "";
    } 


    return {
      nameFilter,
      jobFilter,
      filteredListOfPeople,
      clearHandler,
      newpage,
      peopleToShow,
      paginationCount,
      currentPage,
      pageSize
    }
  }
});
</script>


<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

body {
  padding: 0;
  margin: 0;
}

.app-wrapper {
  display: flex;
}

.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 10px;
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.list-of-people {
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-gap: 30px;
}

.person-item {
  width: 100%;
  box-sizing: border-box;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .img-wrapper {
    height: 200px;
    width: 200px;
    border-radius: 50%;

    img {
      width: 100%;
      height: auto;
    }
  }
}


.filtering {
  padding: 10px;
  .no-padd {
    padding: 0 0 10px !important;
    margin-bottom: 10px;
  }
  
  .var-card__footer {
    margin: 0;
  }
}

.filter-field {
  margin-bottom: 10px;
}
</style>