<template>
  <div class="header">

    <router-link to="/" class="logo"></router-link>

    <div class="menu" :class="{'opened': isMobileMenuOpened}">

      <ul class="inline-list">
        <li class="item">
          <router-link to="/" class="link" exact>Home</router-link>
        </li>
        <li class="item">
          <router-link to="/documents" class="link">Documents</router-link>
        </li>
        <li class="item">
          <router-link to="/contacts" class="link">Contacts</router-link>
        </li>
      </ul>

      <div class="divider"></div>

      <div class="user-profile">


        <div class="avatar" v-if="isUserLoaded"></div>

        <div class="spinner" v-else>
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>

        <div class="details" v-if="isUserLoaded">
          <div class="firstname">{{ userProfile.firstName }}</div>
          <div class="lastname">{{ userProfile.lastName }}</div>
        </div>

      </div>
    </div>

    <button class="navbar-toggler" type="button" @click="showMobileMenu">
      <span class="navbar-toggler-icon"></span>
    </button>

  </div>
</template>

<script>
export default {
  props: {
    isUserLoaded: {
      type: Boolean,
      default: false
    },
    userProfile: {
      type: Object,
      default: function () {
        return {
          firstName: '',
          lastName: '',
        }
      }
    }
  },
  data() {
    return {
      isMobileMenuOpened: false
    }
  },
  methods: {
    showMobileMenu() {
      this.isMobileMenuOpened = !this.isMobileMenuOpened;
    }
  },
  watch: {
    '$route'() {
      this.isMobileMenuOpened = false;
    }
  }
}
</script>


<style lang="scss">
.header {

  padding: 0 20px;
  background: #001C7B;
  color: #fff;
  min-height: 60px;

  display: flex;
  justify-content: space-between;

  position: relative;

  .logo {
    display: inline-block;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNjkgNDMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY5IDQzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZGRkZGRjt9PC9zdHlsZT48dGl0bGU+Q29tcGFueTwvdGl0bGU+PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+PGcgaWQ9IlBhZ2UtMSI+PGcgaWQ9IkRlc2t0b3AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOS4wMDAwMDAsIC04LjAwMDAwMCkiPjxnIGlkPSJMb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOS4wMDAwMDAsIDguMDAwMDAwKSI+PHBhdGggaWQ9IkNvbXBhbnkiIGNsYXNzPSJzdDAiIGQ9Ik0xLjcsMzIuMWwwLTAuMmMwLjEtMS40LDAuNC0yLjcsMS0zLjljMC42LTEuMSwxLjMtMiwyLjItMi43YzAuOS0wLjcsMS43LTEsMi42LTFjMC42LDAsMS4xLDAuMiwxLjUsMC43YzAuMywwLjQsMC41LDAuOSwwLjUsMS40YzAsMC43LTAuMiwxLjMtMC43LDJjLTAuMywwLjQtMC42LDAuNi0wLjksMC44Yy0wLjIsMC4xLTAuMywwLjEtMC40LDAuMXMtMC4yLDAtMC40LTAuMXMtMC4yLTAuMS0wLjMtMC4yYy0wLjItMC4yLTAuMy0wLjMtMC4zLTAuNXMwLTAuMiwwLjEtMC4zYzAuNy0wLjUsMS4zLTEuMSwxLjUtMS43YzAuMS0wLjIsMC4yLTAuNCwwLjItMC42YzAtMC40LTAuMi0wLjctMC42LTAuN2MtMC43LDAtMS4zLDAuNC0yLDEuMUM1LDI3LDQuNSwyNy45LDQsMjguOWMtMC41LDEtMC43LDItMC43LDIuOGwwLDAuM2MwLDEsMC4yLDEuNywwLjYsMmMwLjIsMC4xLDAuMywwLjIsMC42LDAuMnMwLjQsMCwwLjYtMC4xczAuNC0wLjEsMC42LTAuMkM2LDMzLjcsNi40LDMzLjQsNi45LDMzYzAuMS0wLjEsMC4zLTAuMSwwLjQsMGMwLjEsMC4xLDAuMSwwLjMsMC4xLDAuNGMwLDAuMywwLDAuNC0wLjEsMC41cy0wLjIsMC4yLTAuNCwwLjNzLTAuNCwwLjItMC42LDAuNGMtMC42LDAuMy0xLjEsMC40LTEuNywwLjRzLTEtMC4xLTEuMy0wLjJzLTAuNi0wLjMtMC45LTAuNkMxLjksMzMuOCwxLjcsMzMsMS43LDMyLjF6IE05LjYsMzQuNWMtMC4yLTAuMi0wLjMtMC40LTAuNS0wLjdTOSwzMy4yLDksMzIuOGMwLTAuNCwwLTAuOCwwLjEtMS4yczAuMi0wLjgsMC40LTEuMXMwLjQtMC43LDAuNi0xczAuNS0wLjYsMC44LTAuOGMwLjctMC41LDEuNC0wLjgsMi4xLTAuOGMwLjksMCwxLjYsMC40LDEuOSwxLjJjMC4yLDAuNiwwLjMsMS4zLDAsMi4yYy0wLjIsMC44LTAuNSwxLjUtMS4xLDIuMWMtMC41LDAuNy0xLjEsMS4xLTEuOCwxLjRjLTAuMywwLjEtMC43LDAuMi0xLDAuMnMtMC42LDAtMC45LTAuMVM5LjgsMzQuNyw5LjYsMzQuNXogTTEwLjksMzEuMmMtMC4xLDAuMy0wLjIsMC43LTAuMywxYy0wLjEsMC40LTAuMSwwLjctMC4xLDFzMC4xLDAuNiwwLjEsMC43czAuMiwwLjMsMC41LDAuM3MwLjQtMC4xLDAuNi0wLjJzMC40LTAuMywwLjYtMC42czAuNC0wLjUsMC41LTAuOHMwLjMtMC42LDAuNC0xYzAuMy0wLjcsMC40LTEuNCwwLjQtMmMwLTAuNS0wLjEtMC44LTAuMy0xYy0wLjEtMC4xLTAuMi0wLjEtMC4zLTAuMXMtMC4zLDAuMS0wLjUsMC4ycy0wLjQsMC4zLTAuNiwwLjVzLTAuNCwwLjUtMC42LDAuOFMxMSwzMC45LDEwLjksMzEuMnogTTIxLjMsMjkuMmMtMC4zLDAtMC43LDAuNC0xLjQsMS4xYy0wLjUsMC42LTAuOSwxLTEuMSwxLjNsLTAuNiwwLjhjLTAuMywwLjUtMC41LDAuOS0wLjYsMS4zbC0wLjQsMC44Yy0wLjEsMC4yLTAuMiwwLjMtMC4yLDAuNHMtMC4yLDAuMS0wLjMsMC4xcy0wLjIsMC0wLjMtMC4xcy0wLjItMC4xLTAuMy0wLjJjLTAuMi0wLjEtMC4zLTAuMy0wLjMtMC41YzAtMC4xLDAuMS0wLjIsMC4yLTAuNGwwLjMtMC42YzAuMS0wLjIsMC4yLTAuNCwwLjMtMC42bDAuNC0wLjljMC41LTEuMywwLjgtMi4yLDAuOC0yLjZjMC0wLjItMC4xLTAuNC0wLjItMC41bC0wLjEtMC4xYzAsMC0wLjEtMC4xLTAuMS0wLjJzMC0wLjIsMC4xLTAuMnMwLjEtMC4xLDAuMi0wLjJjMC4yLTAuMSwwLjQtMC4yLDAuNi0wLjJzMC40LDAsMC41LDAuMXMwLjIsMC4xLDAuMywwLjJjMC4yLDAuMiwwLjMsMC4zLDAuMywwLjVzMCwwLjMtMC4xLDAuNXMtMC4xLDAuNC0wLjIsMC41cy0wLjEsMC40LTAuMiwwLjVjLTAuMiwwLjQtMC4zLDAuNi0wLjMsMC43cy0wLjEsMC4xLDAsMC4xYzAuOC0xLjEsMS4zLTEuNywxLjUtMS45YzAuNC0wLjQsMC42LTAuNywwLjgtMC44YzAuNC0wLjMsMC43LTAuNCwxLTAuNHMwLjYsMC4xLDAuOCwwLjNjMC4yLDAuMiwwLjMsMC41LDAuMywwLjhjMCwwLjMtMC4xLDAuNi0wLjIsMXMtMC4yLDAuNy0wLjMsMC44bDEtMS4zbDAuNi0wLjdjMC4zLTAuNCwwLjYtMC42LDAuOS0wLjdzMC41LTAuMiwwLjYtMC4yczAuMywwLDAuNSwwLjFjMC4yLDAuMSwwLjMsMC4xLDAuNCwwLjNjMC4yLDAuMiwwLjMsMC41LDAuMywwLjljMCwwLjQtMC4xLDAuNy0wLjIsMS4xcy0wLjMsMC43LTAuNCwwLjlzLTAuMiwwLjUtMC40LDAuN2MtMC4zLDAuNy0wLjUsMS4zLTAuNSwxLjZjMCwwLjIsMC4xLDAuNCwwLjMsMC40YzAuMiwwLDAuNCwwLDAuNS0wLjFzMC4zLTAuMSwwLjMtMC4xYzAuMSwwLDAuMSwwLDAuMSwwLjFjMCwwLjQtMC4yLDAuNy0wLjYsMWMtMC4zLDAuMi0wLjUsMC4zLTAuOCwwLjNzLTAuNCwwLTAuNi0wLjFzLTAuMy0wLjEtMC40LTAuM2MtMC4zLTAuMy0wLjQtMC42LTAuNC0xczAuMS0wLjgsMC4yLTEuMXMwLjItMC43LDAuNC0xczAuMy0wLjYsMC40LTAuOXMwLjItMC41LDAuMy0wLjZjMC4xLTAuMywwLjItMC42LDAuMi0wLjdjMC0wLjItMC4xLTAuMy0wLjMtMC4zYy0wLjIsMC0wLjcsMC40LTEuMywxLjJjLTAuNSwwLjYtMC44LDEuMS0xLDEuNGwtMC41LDAuN2MtMC4zLDAuNS0wLjUsMC45LTAuNiwxLjNMMjEsMzQuNWMtMC4xLDAuMi0wLjIsMC4zLTAuMiwwLjRzLTAuMiwwLjEtMC4zLDAuMXMtMC4yLDAtMC4zLTAuMXMtMC4yLTAuMS0wLjMtMC4xYy0wLjItMC4xLTAuMy0wLjMtMC4zLTAuNHMwLTAuNCwwLjEtMC42czAuMi0wLjUsMC40LTAuOWwxLTJjMC4zLTAuOCwwLjUtMS4yLDAuNS0xLjRTMjEuNSwyOS4yLDIxLjMsMjkuMnogTTIyLDMxLjFDMjIsMzEuMSwyMiwzMS4xLDIyLDMxLjFMMjIsMzEuMUMyMiwzMS4xLDIyLDMxLjEsMjIsMzEuMXogTTI4LjgsMzQuNGMwLDAuMS0wLjEsMC40LTAuMywxLjFTMjguMiwzNi42LDI4LDM3Yy0wLjMsMC45LTAuNSwxLjQtMC43LDEuNmMtMC4yLDAuMi0wLjMsMC4yLTAuNSwwLjJjLTAuMywwLTAuNS0wLjEtMC42LTAuNGMwLTAuMS0wLjEtMC4yLTAuMS0wLjJzMC4xLTAuMywwLjItMC42YzAuNC0wLjgsMC44LTIuMiwxLjQtNC40YzAuMi0wLjksMC40LTEuNSwwLjUtMS44bDAuMi0wLjljMC4xLTAuNiwwLjItMC45LDAuMi0xLjJzMC0wLjMsMC0wLjRzLTAuMS0wLjEtMC4yLTAuMnMtMC4xLTAuMS0wLjItMC4xcy0wLjEtMC4xLTAuMS0wLjJzMC0wLjIsMC4xLTAuMmMwLjEtMC4xLDAuMS0wLjEsMC4yLTAuMmMwLjItMC4xLDAuNC0wLjEsMC42LTAuMXMwLjQsMCwwLjUsMC4xczAuMiwwLjEsMC4zLDAuMmMwLjIsMC4yLDAuMiwwLjQsMC4yLDAuNWMwLDAuNC0wLjEsMC43LTAuMiwwLjljMC44LTEuMSwxLjYtMS43LDIuNS0xLjdjMC44LDAsMS4zLDAuNCwxLjYsMS4yYzAuMSwwLjMsMC4xLDAuNiwwLjEsMXMtMC4xLDAuOC0wLjIsMS4ycy0wLjMsMC44LTAuNSwxLjJzLTAuNSwwLjctMC43LDFzLTAuNiwwLjYtMC45LDAuOGMtMC43LDAuNS0xLjMsMC43LTEuOSwwLjdTMjkuMSwzNC44LDI4LjgsMzQuNHogTTI5LjgsMzEuNGMtMC4yLDAuMy0wLjMsMC42LTAuNCwxcy0wLjIsMC42LTAuMiwwLjlzMC4xLDAuNSwwLjIsMC43czAuMywwLjMsMC41LDAuM3MwLjQtMC4xLDAuNy0wLjJzMC40LTAuMywwLjYtMC41czAuNC0wLjQsMC42LTAuN2MwLjItMC4zLDAuMy0wLjYsMC41LTAuOWMwLjMtMC43LDAuNC0xLjMsMC40LTEuOWMwLTAuMywwLTAuNi0wLjEtMC44UzMyLjQsMjksMzIuMiwyOXMtMC40LDAuMS0wLjYsMC4ycy0wLjQsMC4zLTAuNiwwLjZzLTAuNCwwLjUtMC42LDAuOFMzMCwzMS4xLDI5LjgsMzEuNHogTTQwLjYsMzMuMmMwLDAuNCwwLjEsMC42LDAuNCwwLjZjMC4yLDAsMC40LDAsMC41LTAuMXMwLjItMC4xLDAuMy0wLjFjMC4xLDAsMC4xLDAuMSwwLjEsMC4yYzAsMC40LTAuMiwwLjctMC42LDFjLTAuNCwwLjMtMC45LDAuNC0xLjMsMC4yYy0wLjMtMC4xLTAuNS0wLjMtMC43LTAuN2MtMC4xLTAuMi0wLjEtMC4zLTAuMS0wLjVjMC0wLjIsMC0wLjUsMC4xLTAuOGMtMC40LDAuOS0xLDEuNS0xLjYsMS44Yy0wLjMsMC4xLTAuNSwwLjItMC44LDAuMnMtMC41LTAuMS0wLjctMC4ycy0wLjQtMC4zLTAuNS0wLjVjLTAuMy0wLjQtMC40LTEtMC40LTEuNmMwLTAuOCwwLjMtMS42LDAuNy0yLjRjMC40LTAuNywwLjktMS4zLDEuNi0xLjhjMC42LTAuNSwxLjItMC43LDEuOC0wLjdzMSwwLjMsMS4zLDAuOGMwLjMtMC41LDAuNi0wLjgsMC44LTAuOGMwLjMsMCwwLjUsMCwwLjYsMC4xYzAuMywwLjIsMC4zLDAuMywwLjMsMC41Yy0xLjEsMi4zLTEuNywzLjgtMS44LDQuNEM0MC42LDMzLDQwLjYsMzMuMSw0MC42LDMzLjJ6IE0zNi44LDMzLjJjMCwwLjUsMC4yLDAuOCwwLjUsMC44YzAuMywwLDAuNi0wLjIsMS0wLjdjMC42LTAuNywxLjEtMS42LDEuNS0yLjdjMC4xLTAuNCwwLjMtMC43LDAuNC0xLjFjMC0wLjMtMC4xLTAuNS0wLjQtMC43Yy0wLjEtMC4xLTAuMi0wLjEtMC40LTAuMXMtMC40LDAuMS0wLjYsMC4ycy0wLjQsMC4zLTAuNiwwLjVzLTAuNCwwLjQtMC42LDAuN3MtMC4zLDAuNi0wLjUsMC45QzM2LjksMzEuOCwzNi44LDMyLjUsMzYuOCwzMy4yeiBNNDcuOCwyOS4yYy0wLjEsMC0wLjMsMC4xLTAuNiwwLjRzLTAuNSwwLjUtMC43LDAuN2wtMC42LDAuN2wtMS4xLDEuNGMtMC4zLDAuNS0wLjUsMC45LTAuNiwxLjNsLTAuNCwwLjhjLTAuMSwwLjItMC4yLDAuMy0wLjIsMC40cy0wLjIsMC4xLTAuMywwLjFTNDMsMzUsNDIuOSwzNXMtMC4yLTAuMS0wLjMtMC4yYy0wLjItMC4xLTAuMy0wLjMtMC4zLTAuNWMwLTAuMSwwLjEtMC4yLDAuMi0wLjRsMC4zLTAuNmMwLjEtMC4yLDAuMi0wLjQsMC4zLTAuNmwwLjQtMC45YzAuNS0xLjMsMC44LTIuMiwwLjgtMi42YzAtMC4yLTAuMS0wLjQtMC4yLTAuNWwtMC4xLTAuMWMwLDAtMC4xLTAuMS0wLjEtMC4yczAtMC4yLDAuMS0wLjJzMC4xLTAuMSwwLjItMC4yYzAuMi0wLjEsMC40LTAuMiwwLjYtMC4yczAuNCwwLDAuNSwwLjFzMC4yLDAuMSwwLjMsMC4yYzAuMiwwLjIsMC4zLDAuMywwLjMsMC41czAsMC4zLTAuMSwwLjVzLTAuMSwwLjQtMC4yLDAuNXMtMC4xLDAuNC0wLjIsMC41cy0wLjEsMC4zLTAuMiwwLjVMNDUuMSwzMWMwLDAuMSwwLDAuMSwwLDAuMWMwLjUtMC43LDAuOC0xLjIsMS0xLjRsMC41LTAuNmMwLjQtMC40LDAuNi0wLjcsMC44LTAuOGMwLjQtMC4zLDAuNy0wLjQsMS0wLjRzMC40LDAsMC42LDAuMWMwLjIsMC4xLDAuMywwLjEsMC40LDAuM2MwLjMsMC4yLDAuNCwwLjUsMC40LDAuOXMtMC4xLDAuNy0wLjIsMS4xcy0wLjMsMC43LTAuNCwxcy0wLjIsMC41LTAuMywwLjdjLTAuMywwLjgtMC41LDEuMy0wLjUsMS43YzAsMC4yLDAuMSwwLjIsMC40LDAuMmMwLjIsMCwwLjQsMCwwLjUtMC4xczAuMy0wLjEsMC4zLTAuMWMwLjEsMCwwLjEsMCwwLjEsMC4xYzAsMC40LTAuMiwwLjctMC42LDFjLTAuMywwLjItMC41LDAuMy0wLjgsMC4zcy0wLjQsMC0wLjYtMC4xcy0wLjMtMC4xLTAuNC0wLjJjLTAuMy0wLjItMC40LTAuNi0wLjQtMWMwLTAuNSwwLjItMS4yLDAuNS0yYzAuMi0wLjUsMC40LTAuOSwwLjUtMS4xbDAuMi0wLjVjMC4xLTAuMywwLjItMC41LDAuMi0wLjdTNDgsMjkuMiw0Ny44LDI5LjJ6IE01MC43LDM0LjNjLTAuMS0wLjItMC4xLTAuMy0wLjEtMC41czAtMC40LDAuMS0wLjZzMC4yLTAuNSwwLjMtMC43czAuMi0wLjUsMC4zLTAuOGwwLjQtMC44YzAuNS0xLjEsMC42LTEuNywwLjUtMS45Yy0wLjEtMC4xLTAuMi0wLjItMC4zLTAuM2MtMC4xLDAtMC4xLTAuMS0wLjEtMC4yczAtMC4yLDAuMS0wLjJzMC4yLTAuMSwwLjMtMC4yYzAuMi0wLjEsMC40LTAuMiwwLjctMC4yczAuNCwwLDAuNSwwLjFzMC4yLDAuMSwwLjMsMC4yYzAuMiwwLjIsMC4yLDAuMywwLjIsMC41czAsMC40LTAuMSwwLjZzLTAuMSwwLjUtMC4yLDAuN3MtMC4yLDAuNS0wLjMsMC44Yy0wLjMsMC43LTAuNSwxLjItMC42LDEuNWwtMC4zLDAuNWMtMC4xLDAuMy0wLjIsMC41LTAuMiwwLjdzMCwwLjIsMC4xLDAuM3MwLjEsMC4xLDAuMiwwLjFzMC4yLDAsMC40LTAuMXMwLjMtMC4yLDAuNC0wLjNzMC4zLTAuMywwLjUtMC41czAuMy0wLjQsMC41LTAuNmMwLjQtMC41LDAuNy0wLjksMC45LTEuM2MxLTEuOCwxLjUtMi44LDEuNi0yLjhjMC4yLTAuMiwwLjMtMC4zLDAuNS0wLjNzMC4zLDAsMC40LDAuMXMwLjIsMC4xLDAuMywwLjFjMC4yLDAuMSwwLjIsMC4zLDAuMiwwLjRzLTAuMiwwLjQtMC4zLDAuN2MtMC45LDIuNS0xLjQsNC4xLTEuNyw0LjdzLTAuNSwxLjEtMC43LDEuNXMtMC40LDAuOC0wLjcsMS4xYy0wLjMsMC40LTAuNSwwLjctMC44LDFjLTAuNywwLjctMS4zLDEuMS0xLjksMS4xYy0wLjIsMC0wLjQsMC0wLjUtMC4xYy0wLjItMC4xLTAuMy0wLjMtMC4zLTAuNHMwLjEtMC4yLDAuMy0wLjNzMC40LTAuMSwwLjYtMC4zczAuNC0wLjMsMC42LTAuNWMwLjYtMC42LDEuMS0xLjIsMS40LTEuOWMwLjMtMC42LDAuNS0xLjIsMC43LTEuN2wwLjUtMS42Yy0wLjEsMC4yLTAuMywwLjMtMC40LDAuNmwtMC41LDAuN2MtMC40LDAuNS0wLjgsMC45LTEuMSwxLjJjLTAuNSwwLjQtMSwwLjYtMS40LDAuNkM1MS4zLDM1LjEsNTAuOSwzNC44LDUwLjcsMzQuM3ogTTIwLjEsNS4ybC0xNy41LDE5bC0yLjItMkwyMCwwLjhsMTAuNSwxMC41bDE5LjgtOC4ybDE4LjUsMzcuN2wtMi43LDEuM0w0OC45LDYuOWwtMTksNy45TDIwLjEsNS4yeiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==);
    height: 43px;
    width: 69px;
    background-size: contain;
    background-repeat: no-repeat;

    margin: 8px 0;
  }

  .menu {

    @media only screen and (max-width: 480px) {
      display: none;
    }

    display: flex;

    @media only screen and (max-width: 967px) {
      &.opened {
        display: block;
        position: absolute;
        top: 100%;
        right: 0;

        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.20);
        border: 1px solid #979797;
        z-index: 14;

        .inline-list {
          width: 100%;
          display: block;

          .item {
            display: block;
            text-align: left;

            .link {
              color: #001C7B;
              background: #fff;
              padding: 10px;
              justify-content: normal;
              align-items: normal;

              &.router-link-active {
                background: #001C7B;
                color: #fff;
              }
            }
          }
        }

        .divider {
          width: 100%;
          height: 1px;
          background: #979797;
          margin: 10px 0;
        }

        .user-profile {
          padding: 0;

          .avatar {
            display: none;
          }

          .details {
            .firstname {
              color: #001C7B;
              padding: 10px;
              width: 100%;
              display: block;
            }

            .lastname {
              color: #001C7B;
              padding: 10px 10px 20px 10px;
              display: block;
              width: 100%;
            }
          }
        }

      }

    }

    .inline-list {
      display: flex;
      list-style-type: none;
      padding: 0;
      margin: 0 15px 0 0;
      align-items: stretch;

      .item {
        display: flex;
        align-items: stretch;


        .link {

          display: flex;
          justify-content: center;
          align-items: center;

          font-size: 12px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: left;
          padding: 0 15px;

          text-decoration: none;
          font-family: Verdana, sans-serif;


          &.router-link-active {
            color: #001C7B;
            background: #fff;
          }
        }
      }
    }

    .divider {
      height: 100%;
      width: 1px;
      background: #ffffff;
    }

    .user-profile {
      display: flex;
      align-items: center;
      padding: 0 20px 0 30px;

      .avatar {
        width: 30px;
        height: 30px;
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5BdmE8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+ICAgICAgICA8Y2lyY2xlIGlkPSJwYXRoLTEiIGN4PSIxNSIgY3k9IjE1IiByPSIxNSI+PC9jaXJjbGU+ICAgIDwvZGVmcz4gICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+ICAgICAgICA8ZyBpZD0iRGVza3RvcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg4Ny4wMDAwMDAsIC0xNC4wMDAwMDApIj4gICAgICAgICAgICA8ZyBpZD0iVXNlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODg4LjAwMDAwMCwgMTIuMDAwMDAwKSI+ICAgICAgICAgICAgICAgIDxnIGlkPSJBdmEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAzLjAwMDAwMCkiPiAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgZmlsbD0id2hpdGUiPiAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+ICAgICAgICAgICAgICAgICAgICA8L21hc2s+ICAgICAgICAgICAgICAgICAgICA8dXNlIGlkPSJPdmFsIiBzdHJva2U9IiM5Nzk3OTciIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPiAgICAgICAgICAgICAgICAgICAgPGltYWdlIGlkPSJkb3dubG9hZCIgbWFzaz0idXJsKCNtYXNrLTIpIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBT0VBQUFEaENBTUFBQUFKYlNKSUFBQUFZRkJNVkVYLy8vK1ptWm1XbHBidjcrK1FrSkNVbEpTTmpZMk1qSXlibTV1R2hvYjI5dmI3Ky92czdPeUZoWVh5OHZMMTlmWFEwTkNvcUtqbDVlWGQzZDNEdzhPaW9xS3lzcksvdjcvWTJOakt5c3ExdGJYZjM5L241K2U3dTd2VTFOU3RyYTJ0RDc4bEFBQUFSR1ZZU1daTlRRQXFBQUFBQ0FBQmgya0FCQUFBQUFFQUFBQWFBQUFBQUFBRG9BRUFBd0FBQUFFQUFRQUFvQUlBQkFBQUFBRUFBQURob0FNQUJBQUFBQUVBQUFEaEFBQUFBQmlmeHNjQUFBMUVTVVJCVkhnQjdaMEp1Nm9zRUlDVFFERmJ0TFF5Ni9ULy8rVTNhQXZ1RElKeXpuZDlubnNQdWZJeU1EUHNLKyt2SDZ1L0R1ajlJL3o5SXY0bnczOHlkRDhGL3VWU1F6TGlBKzhadWpid21PcWxPV1RJUFFGQkNJT0RpdjhZSTRUQUtXNFpya3dFNjRRQVFSZ05LR1dFWjFsU0hSbm5qTUpKUmtwNFZYRm8zV2Vka0FZNzMwc3UrZW0rM2g4T20rbzQ3TmZiSXI0OE9RMURLcVJwOGJCSHlJWHNLTC9scDgycTk0aU84UzJEMjJSS2tMckozR3VQa1Bva3lZdDFMOXpud3VFWW43bnZFNEZsRXUyVkx5d1JrakRJNHZXQThENThaU0RhWDU4MFpEWUFiWGplSEhJbnp4V0UxNkQ4ZVlyY2FseVN4bVhJUFVwdjEzMDk5bXEvb3VQREM0aHBFMktZa0h0QmNMNUhha1R0dTZKMVRrUERqRVlKUVg3c3BpVStDVGJubGRJeFZTak5FRmFGaDlQZ2NaVGlxaG5jcDhRM2hRZjYxQXloVU16Y0MzbWhDZFY0N0g3ZXNaZXVuLzdIQ0NFb0I2RmdmaG9SbmZDenlGNVoxUkZDRUNBQkJUT0JxUFhvSmcyb0dmTnZSSVllK0pleHRnSnQwVlVuamp3MGdqaUo4Qk9ESUVFYitCNHU2WFNVQnV6ekJmM2NPb213K2l3bllhcnNuMGtFNDhHWUdNaXBVd2xCeDdBZ0hvK3MzaDFISGt5VzRsUkN6Nk44cXhkOXBhZWV2bjcrcko2Y1JDalMxODhzRk1FdmZIU1phdjBuRVlLVnNLSmp2b0FRU25mVHBEaUJVRWd3ZU5SaVkrVkhQTTM0VHlBVWdHY3JUSTJYVGtPY1FzaURweDByMFNCY3hic0pudmdVd3VEV2pJcXQzM0VnTjFYaHl1VUVRajh6N2FqMUoxQ3FieGMxQ1lXaHQyb0htN0EzYlNjVlRmanlNVGp4YkJyNkp1QnFsZWlhZmpSaFZRaWd1bXVnTnQvbTZEK3p6elI5VkRTaGtDSDhDOVAreU5pNVVtZ0tFVTFZNm0zdXo2Wkd2OGwxMVhOdThJUkNob1JQYlZIN1JsdzlkUFpmU2dCbExyUUl2ZDNNaGJCS2hUWFhhWi9TSWd4bUw0UVY0cEdXT2dBblNRMUN6cko1bkxWMi9yMW9HSDRkd3VEYS92Wk1aM3g4eXcyZWtNOVJZK3BMc0ZPQTBqTGlaalFodEl3dWxVY0JPenFqN1Q2YTBGdEt6VlJpTGV3VExxZG1La1Mwc2tISXNGVFMzTGZXZE5oWDl1cm5EOWlxSW9KUUZGdndaZzcxTDg3KzY0YTBHQ2hDcUJXR3kxbUtWMXJ1eStGVUlyblZEaFFoVkh2WjdESnJmZkFDbmczaXdCRXVyRWdyV09HN0lRNGM0ZktsVUVEZVVCWURSMGd2clR5endJbGloL0c5VVlUY045UlJQekZaR01ZN1JSR3laTDcydzZGRVNBTkVDekdHa0lmNTBIZm51M2FIY2FuS0I0YlFDNjEycEttbjBDWkJaRk1FSWFlWmVpVHMzaGtqREFhQzBQTVhhcnhvcDlZUjBXQ0RJQ1RNNklpWmRyelZ6Mnd5OVlLSUlGeTYzaVFuQUtLbkJrRklIMjdZQ2tGNlVqZjZHRUtENDlaa2VlaUVvWmFvNnRjZ0NOMHBocEFtbWJLdVVTY2syUkl0K1gwQ3ZpbTM4S3NUMGxsR0pmUVJOYy9ueWoxUnlvUThjTVJscTFqVkhUZDF3dDNpN1JleUhQZlFDYTEyS0JONm9UUDJYcEFlbEZXTk1pR2g3bGhESUl4dXFzcFVtWkI1Y2laWlBweXFPdC9xaE01VUxLclVWYTVlS0JFSzk4Ri9MaTgzT1FaWDB6SmN0RTlOSm51SFQ0WUpPWGVuY2xneEtsY1JsWEtwTUR5K1V3Wi90Ym9iMXFVd0pjYWhtb1dRNHRZd0lReFlYN2hYN1YzKzNuOU55eEFJWFpPaGFhK05VRGVhdTk4aVhLMVZIVk5sVFVPZGNyeWhIQm9uWExwMyt5TzhWK0IvVUE0TjYxS3dGbi9jSG9MRmQ2YkJ1OHFteG4wYTUvelN3blF1NWI1VERWR3IxZFV3SVZqOHBLbk5sdjF0dG40b1BHL0dseVZxZnQxOEhaL1E1amNXL1cyaG5jWUw1cDFCTXBKKzBBMHNjcGJDb2V5MWVidlR5RWRudld5aHZaVGJtOCtza3pSYjVjRUs2aktrQzB3aTZXZi9NZDl2NFpGa3dkSFBMZFNIOGhoTWRSbDZ6Q1ZWazZnMnRXRkdzcnRVUTR5b2pUNWc2cER2ZlF3VjdFUjFDeWFYT2xRUTgwQjV3U3dFSVhHbklFYks5aDQzbzhTZGhnemxKZ3pJcUFnWk90UTVvOXd0Z3lRa2dTT2RwTkhUenRoRW1JcmdTS3Z3R2pNaEFaTkxQVmNHbk1TWUdXd29RazRYbVIzYmN0bTRjR2dzalBxQ3Q3clJwTGhWTi9kSVRRTk5HWXZOajVYbGVGRWU4UVdBS0dzQnR3Y082SnF0VUtTcWVSUkZLUHdrRjRaNjV5Z1JZbVc0MEV4OE9ZK3FqNFlTZVJRblE3aWRzOFdiVFhPTXFjQVJpZ1NCRlJLWGJwQmlxbzFzWlh4Uk1xd0kyWE5aMXkzR0xzV0RzdmdsNDdMcVZIa0l4a3VDZUJtQ1RTUnl1Wjg3akxPRkFoTXZReDR1T081a1cxdWYvaU9ub1FDZUVKVE5jdDRwUjAwZkxjRzFDTTlMS1pzZmpXV0dOQWlYODkyMlVDOVVkOWRlV1ZlSGtKUGRJbE12TmdrK2oycG9HcEdHM0YvRUtHSzltVXFJT2pJRXhDVW1YMnhEMWFGc3IvdzVoUkNLNHV5RHdOWUUwZndrTWVySkVEeHdPbk5Sako2NFN0T0hVWk1Rak9MTWJmd1hVYVZBSzFKNFJwY1FpdUpNeTdOV2ZtRzg0OG85RlIveGxRRnRRa0NjWVEzaHQ5dDcxVjhSV3BPd3pDN3pPYWhIMkE2ckxobjFYNXFFNVFkbVcyTmh1OU1IMUMrSGdwSE1NMFhoQ0FPeTFHWFd2SE9LREdIVnFEbDZNdTdDRU9valRpSUU5YjI3Mks1bkZMc3BFcHhnTGQ2WndmYVMxN0g2bUlSM2xPcC9KOG9RWGhhY2JZNnpTYWN0T1EveG0wN0lBODlhbmY5d25ySWFleVhMNllUZ3dObHFRejBteWlPZjZqbFQvbVdBRUZTcWIyV0ZyQk5zbnlqSFZTOXNnbERVRjRueElXSHIyeFE3LzAwTkE0UWluVGxsdVZtRlUzaktvdysvTkYwaEE0VGxheUduWmdiRnVIblFTV1plUWpWRktNUVlQZ3d4YnVKQWZWU1hCTk1aTkVjSXIvZEpiR0x0ejJ0aWNwOUhvNFRnaW1lVG0veVA1d0Q2end3bzBaZEV6UkZXY1dJN0hrOW93ZGtVV1VqTHlyeG1qYjZkVWMwUnZ0N05tYzl6emZKNCtFbG9PZmJYbkFSTmVHMk5WSVBJTVVwdUdndWgzTlBNbjFDWGI4VGo4OU80RE1XYlliWmk2RDIyQ0FNWmJmTXNWRi9kNmhOOWhZQVZRc0hJZkpha0tsczZ3MW96UmY1a1BvV0hUT2JPTjd3bFFoSFhjbHZ1WjM0Y0Z1VTJmbVJpNDNVcmRJTFNDdUZiRkdMejhURDArVG1GbmRWaFgvVW9xaG9Fb21pek9leTNSZjdJV0dCN2MzVXJoTzhNSXY1eTJNVGE5eW56c3VSNWUxenlGSTdINDV4azBERUE1Nkd6NVowZThsTUd3OVlKUzBySXNvU0pnNzRPQ0lwUnNNTG9XUWEwazBzTlNtRDZxNHpJOEMyRzk5L3AwVEw0QmlPRUVKOEt6aWdpdk16RSswd1Jsb2x1SWtJZjZZRjFOR0lnRFJCQ1BJZ3cxOFlQR0tObjRLMEdDRW13WTVtcFBhWS95UVNiOEVLbkFYWXppOC9qM3dDZXNKYXN3bS9KTGpBZ2MvdWsrQUZaMzJnMFFzTHBTK0N0eHp4aGIzOEh2bHY3ZE9PUjNwOTR3cytyT0NRelRmTGk1WlVWTi8vZFBxMFZrKzk3WWJDMW4veFU3cy9tR0NmZzRsWndXdS9WSm9UNnc0NDhaS2N6dXArRGIvVkFLemFsZHZHQ01EdEp6dXptbmhOdy9YVFZqaDRoT0p5VW5kc0RUZzVsRlE4U1hJY1BuaEdPTEdWcHV3SmRQT0Q4Ujhxb2dBNGh1Sm9CdjNUWGNRK25NeWtyUXFoWVZEZER0Z2pvTTI3emlkNzhlNTc1V2szZ2VFTGdDLzE4M2R0dEdLM2pUS3ZDQU5VUW50NTczN3M2NUR6VTZFcEVFMExUTHg5ZGJtaC9QWHRscFU4bHUwTHVGQ3FaUGZQdWJQRWVqd0YvcjlET2djMGNhRUtmcEVwdGFlc2lUVGdOb09XbGcvSlRUS0hnRVFwMXFPeHlIY1VUcEFmSUg4aFJDemhDem5hMzdtSWlKZlFudU5rWDZaUFFjQmNJbTlZNlFIQitDRFk5ZVp6VzZnM0ptMGNnaG4rcE56YWlDSW1mNER0RE4vZWY5UEhNUEtsMkNGa1M2b2Y4ZWI3OHFMWGtmQkpOQlBZMzBXU3NmQ0FJb1NjMGxzeFU3YXRqUDZMOTluNHNUdGRyRE1mMWVqMFY5KzIrWDZtTXZDN21pRkY4Nm9ROHpKU0t5a2pzakZ4ZW45WDdGc2NKWCthYkxURm90ajg1WWlJYS96OGFheURQamhPV0QwTzJhSHN3L2QrZjRjbzlVWnpoTlVwWUpoUVBFM1VWT2dPZStFVDBWSnNzTzBvSU9RR012Rk9yNzd5VE1QWTdiRkFydjQ0VENrQ0hWalY1NDRtL0o1V3RaY2NKWVhhRkE1Ti9aYkJ2dUJDOS9TUEhDQ0ZrVWNZYzB6RmZRTEZPNjJoOVk0UVFzaWh6YkhsZEdYQzFXbnVBT0NqSEVVTElvbmcvclI0SHk3L3VBbkhvR0NFa3RvYXNtZVBlanV5NFBrTG9PNnRrdmttMEhYYkVCd2doZis5RzY3cmZEeTBYdWc2MnFnNFF3dURZR1dkVVRFbWc2NUFETjBSSUY1bURwNE9hRGt4aDd5Zmt4UHlJU3AzWUt6MlQ5VmNZZXdtNVk1c0REWU51ZUs5ejAwdm94T2JHdzFqeTFmNHRTL29JWjU5OUowZFhKM3pwSzRwOWhMK3BFRllKMHVlaDloQnlkK3NUZlFJdXl0Njl0Z2ZYU2NnaFBmcGU1TzU1MkxtenpkYzNKc3FoUlNEVlU3Um4rOVZ1R2JwYXFSL0dMVHJYbE9naUJGa3JkVTBNZjIrQnEwbVgzZThrZEd1clEvV2tXbmQxajNRUS9rbzFVeVZEMmxFYjdpQmNZTDBFZFRFTjM5bTF4bElINGRKclhRMURERi9OMjU1TkI2SDdEUmY5bEZHN010d21aSWwycjFmL2wyZTcwbDZydlUyNGM3cjFjQ3lwOWw1ejFIR1RFT3BaWXk5eCsvcEZxRlBaZTJzU2VtNXQ4b0JQeldQVFlEUUpHVmNmTklELy9CeFAzQnFJTlVJUXJrdUw1K3VsUjlIb1Zxd1JRdVA0Z3F2TjZRRzFueUwxa1JvTlF1Yllucmp0K0krZmFXeTdYaVBrUEhTNEoyMmNyYnBEckZzbkhUVkN6NWwxNVZWcHV1NkROZWtsd1BxTUV1YzJWK3NDR0Q5M3JXblR1Z3gvczB2NkpkL1dUSDZOa1BIZldiZi93bFdobTd6TlRwM1F5dklXemUvYi8zM2FTVzViamRDbDNZQ21wRU1rRDdTcEVmNml6cWJoQkpDWEFaVUozZHAzYkpoaCtHb3NyUm9pRVM2NkJQSndqTEZYWmFNdkVYcmgzOUNra0J6eTdvZ1NJZUdiOVY4NUxsKzM1a3NveGlEK2xVT3U1SDhKd1pmN0s0QTExL3MvQmV1djBlem1uYm9BQUFBQVNVVk9SSzVDWUlJPSI+PC9pbWFnZT4gICAgICAgICAgICAgICAgPC9nPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==);
        background-repeat: no-repeat;
        background-size: contain;
        margin: 0 20px 0 0;

      }

      .details {
        font-size: 12px;
        color: #FFFFFF;
      }

      .spinner {
        width: 40px;
        height: 40px;

        position: relative;

        .double-bounce1, .double-bounce2 {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #fff;
          opacity: 0.6;
          position: absolute;
          top: 0;
          left: 0;

          -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
          animation: sk-bounce 2.0s infinite ease-in-out;
        }

        .double-bounce2 {
          -webkit-animation-delay: -1.0s;
          animation-delay: -1.0s;
        }

      }
    }
  }


  .navbar-toggler {
    display: none;

    @media only screen and (max-width: 480px) {
      display: flex;
      align-items: center;

      background: transparent;
      border: none;

      .navbar-toggler-icon {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjE3cHgiIHZpZXdCb3g9IjAgMCAyMCAxNyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5tb2JpbGUgbmF2IGJ1dHRvbjwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJNb2JpbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yODAuMDAwMDAwLCAtMjEuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+ICAgICAgICAgICAgPGcgaWQ9Im1vYmlsZS1uYXYtYnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODAuMDAwMDAwLCAyMS4wMDAwMDApIj4gICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS03IiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMyIgcng9IjEuNSI+PC9yZWN0PiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTciIHg9IjAiIHk9IjciIHdpZHRoPSIyMCIgaGVpZ2h0PSIzIiByeD0iMS41Ij48L3JlY3Q+ICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtNyIgeD0iMCIgeT0iMTQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzIiByeD0iMS41Ij48L3JlY3Q+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+);
        width: 20px;
        height: 17px;
      }
    }

  }


}
</style>
