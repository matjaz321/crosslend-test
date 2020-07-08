<template>
  <div class="documents">
    <h1 class="title">Documents</h1>
    <div class="row">
      <div class="col-auto">
        <a href="#" class="toggle-filter" @click.prevent="toggleFilter"><span>Filter by</span></a>
        <div class="sidebar" :class="{'opened' : sidebarOpened}">
          <div class="bg">
            <div class="inner">
              <h2 class="title">
                Filter By
                <a href="#" @click.prevent="toggleFilter" class="close"></a>
              </h2>

              <div class="form">

                <DatePicker :input-class="'form-control'" :placeholder="'From'" v-model="filterFrom"
                            :format="'DD-MM-YYYY'" :valueType="'YYYY-MM-DD'"/>
                <DatePicker :input-class="'form-control'" :placeholder="'To'" v-model="filterTill"
                            :format="'DD-MM-YYYY'" :valueType="'YYYY-MM-DD'"/>

                <button class="submit" @click="applyFilters">Apply filters</button>
                <button class="clear" @click="clearFilters">Clear filters</button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="content">
          <div class="bg">
            <div class="inner">

              <div v-if="isDocumentsLoaded">
                <table class="table">
                  <thead>
                  <tr>
                    <th class="name">
                      <a href="#" class="link" :class="getFilterClass('name')" @click.prevent="changeFilter('name')">Document
                        Name</a>
                    </th>
                    <th class="date">
                      <a href="#" class="link" :class="getFilterClass('date')" @click.prevent="changeFilter('date')">Date</a>
                    </th>
                  </tr>
                  </thead>
                  <tbody v-if="filteredAndSortedDocuments.length > 0">
                  <tr v-for="(document, index) in paginatedDocuments" :key="'doc' + index"
                      :class="{'odd': index % 2 === 0, 'even': index % 2 !== 0 }">
                    <td>
                      <span class="text">
                        {{ document.name }}
                      </span>
                    </td>
                    <td>
                      <span class="text">
                        {{ document.date | getFormatedDate }}
                      </span>
                    </td>
                  </tr>
                  </tbody>
                  <tbody v-else>
                  <tr>
                    <td colspan="2">
                      <span class="text">Documents not found</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div class="pagination">
                  <button class="btn" @click.prevent="showPage(0)">&#60;&#60;</button>
                  <button class="btn" @click.prevent="showPage(currentPage > 1 ? currentPage - 1 : 0)">&#60;</button>
                  <span class="counter">{{ currentPage >= totalPages ? totalPages : currentPage + 1 }} of {{
                      totalPages
                    }}</span>
                  <button class="btn"
                          @click.prevent="showPage(totalPages - currentPage > 2 ? currentPage + 1 : totalPages - 1)">
                    &#62;
                  </button>
                  <button class="btn" @click.prevent="showPage(totalPages - 1)">&#62;&#62;</button>
                </div>
              </div>

              <div class="spinner" v-else>
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import moment from 'moment';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';


export default {
  data() {
    return {

      filterFrom: '',
      filterTill: '',
      sortingOption: 'desc',

      sidebarOpened: false,

      currentPage: 0,
      isDocumentsLoaded: false,
      documents: [],
      documentsPerPage: 10
    }
  },
  methods: {
    init() {
      const DOCS_API = 'https://frontend.apply.crosslend.dev/documents.json';

      axios
          .get(DOCS_API)
          .then(response => {
            if (response.status === 200) {
              this.isDocumentsLoaded = true;

              if (response.data.documents.length > 0) {
                for (let i = 0, len = response.data.documents.length; i < len; i++) {
                  if (this.getFileExtension(response.data.documents[i].name) === 'pdf'
                      || this.getFileExtension(response.data.documents[i].name) === 'docx') {
                    this.documents.push(response.data.documents[i]);
                  }
                }
              }

            } else {

              let _documents = require('../../_docs/info.json');
              for (let i = 0, len = _documents.length; i < len; i++) {
                if (this.getFileExtension(_documents[i].name) === 'pdf'
                    || this.getFileExtension(_documents[i].name) === 'docx') {
                  this.documents.push(_documents[i]);
                }
              }
            }
          });

    },

    getFileExtension(path) {

      var extension = path.match(/\.([0-9a-z]+)(?:[#]|$)/i)
      return extension && extension[1]
    },

    paginate() {

      if (Math.ceil(this.filteredAndSortedDocuments.length / this.documentsPerPage) > 1) {
        return this.filteredAndSortedDocuments.slice(this.currentPage * this.documentsPerPage, this.documentsPerPage * this.currentPage + this.documentsPerPage)
      } else {
        return this.filteredAndSortedDocuments;
      }
    },

    showPage(page) {
      this.currentPage = page;
    },

    changeFilter(type) {

      if (type === 'date') {

        this.$router.push({
          path: 'documents',
          query: {...this.$route.query, filter: 'date', sorting: this.sortingOption}
        }).catch(() => {
        })
      }

      if (type === 'name') {

        this.$router.push({
          path: 'documents',
          query: {...this.$route.query, filter: 'name', sorting: this.sortingOption}
        }).catch(() => {
        })
      }

      return '';

    },

    getFilterClass(type) {

      if (type === 'date') {
        if (typeof this.$route.query.sorting === 'undefined'
            && typeof this.$route.query.filter === 'undefined') {
          this.sortingOption = 'asc';
          return 'asc';

        } else {

          if (this.$route.query.filter === 'date') {

            if (this.$route.query.sorting === 'asc') {
              this.sortingOption = 'desc';
              return 'desc';
            }

            if (this.$route.query.sorting === 'desc') {
              this.sortingOption = 'asc';
              return 'asc';
            }

          }
        }
      }

      if (type === 'name') {
        if (typeof this.$route.query.sorting === 'undefined') {
          return '';
        } else {
          if (this.$route.query.filter === 'name') {

            if (this.$route.query.sorting === 'asc') {
              this.sortingOption = 'desc';
              return 'desc';
            }

            if (this.$route.query.sorting === 'desc') {
              this.sortingOption = 'asc';
              return 'asc';
            }

          }
        }
      }

      return '';

    },

    applyFilters() {


      let _range = '';

      if (this.filterFrom !== null) {
        _range = this.filterFrom;
      }

      _range = _range + 'x';

      if (this.filterTill !== null) {
        _range = _range + this.filterTill;
      }

      if (_range !== 'x') {
        this.$router.push({
          path: 'documents',
          query: {...this.$route.query, range: _range}
        }).catch(() => {
        })
      }

      this.toggleFilter();

    },

    clearFilters() {
      this.filterFrom = '';
      this.filterTill = '';
      this.$router.push({
        path: 'documents'
      }).catch(() => {
      });

      this.toggleFilter();
    },

    toggleFilter() {
      this.sidebarOpened = !this.sidebarOpened;
    }
  },

  mounted() {
    this.init();
  },

  filters: {
    getFormatedDate(value) {
      if (!value) return '';
      value = value.toString()
      return moment(value).format('DD-MM-YYYY');
    }
  },

  computed: {
    //compute number of pages, we always round up (ceil)

    totalPages() {
      return Math.ceil(this.filteredAndSortedDocuments.length / this.documentsPerPage) > 1 ? Math.ceil(this.filteredAndSortedDocuments.length / this.documentsPerPage) : 1;
    },

    filteredAndSortedDocuments() {
      //filter out all candidates that have experience less than 10
      let filtered = this.documents.filter((_document) => {
        let _result = true, _filter1 = true, _filter2 = true;

        if (typeof this.$route.query.range !== 'undefined') {
          let _filterArr = this.$route.query.range.split('x');

          if (_filterArr[0] && _filterArr[0] !== '') {
            _filter1 = moment(_document.date).isAfter(_filterArr[0]);
          }

          if (_filterArr[1] && _filterArr[1] !== '') {
            _filter2 = moment(_document.date).isBefore(_filterArr[1]);
          }

          _result = _filter1 && _filter2;
        }

        return _result;
      });

      if (typeof this.$route.query.sorting !== 'undefined') {

        if (this.$route.query.filter === 'date' && this.$route.query.sorting === 'asc') {
          filtered = filtered.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
        }

        if (this.$route.query.filter === 'date' && this.$route.query.sorting === 'desc') {
          filtered = filtered.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
        }

        if (this.$route.query.filter === 'name' && this.$route.query.sorting === 'asc') {
          filtered = filtered.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        }

        if (this.$route.query.filter === 'name' && this.$route.query.sorting === 'desc') {
          filtered = filtered.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
        }

      } else {

        filtered = filtered.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

      }

      return filtered;

    },

    paginatedDocuments() {
      return this.paginate()
    }
  },

  watch: {
    '$route.name'() {

      // Reset values, when client navigate to other page
      this.filterFrom = '';
      this.filterTill = '';
    },
    '$route.query.sorting'() {
      this.sortingOption = this.$route.query.sorting;
    },
    '$route.query.range'() {
      this.filterOptions = this.$route.query.range;
    }
  },

  components: {
    DatePicker
  }
}
</script>

<style lang="scss">
.documents {
  padding: 30px 20px;

  .title {
    font-family: Helvetica, sans-serif;
    font-size: 18px;
    color: #464646;
    letter-spacing: 0;
    text-align: left;
  }

  .toggle-filter {
    display: none;

    @media only screen and (max-width: 480px) {
      display: inline-block;
      left: -20px;
      position: relative;
    }
    background: #D8D8D8;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.20);
    border-radius: 0 2px 2px 0;

    font-size: 12px;
    color: #4E4E4E;
    letter-spacing: 0;
    text-align: left;

    padding: 15px 10px;
    text-decoration: none;

    span {
      font-family: HelveticaNeue, Helvetica, sans-serif;
      font-size: 12px;
      color: #4E4E4E;
      letter-spacing: 0;
      text-align: left;
      display: block;
      writing-mode: vertical-lr;
      text-orientation: mixed;
      white-space: nowrap;

    }
  }


  .sidebar {
    margin: 0 20px 0 0;
    min-width: 200px;

    transition: 0.3s all;

    @media only screen and (max-width: 480px) {
      position: absolute;
      transform: translateX(-300px);
      top: 0;

      &.opened {
        transform: translateX(-20px);
        z-index: 14;
      }
    }

    .inner {
      padding: 15px;
    }

    .title {
      font-family: Helvetica, sans-serif;
      font-size: 14px;
      color: #464646;
      letter-spacing: 0;
      text-align: left;
      margin: 0 0 15px 0;
      position: relative;

      .close {
        display: none;

        @media only screen and (max-width: 480px) {
          background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Hcm91cCA1PC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPiAgICAgICAgPGZpbHRlciB4PSItMTMwLjAlIiB5PSItMTMwLjAlIiB3aWR0aD0iMzYwLjAlIiBoZWlnaHQ9IjM2MC4wJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZmlsdGVyLTEiPiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjIiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlR2F1c3NpYW5CbHVyPiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjUgMCIgdHlwZT0ibWF0cml4IiBpbj0ic2hhZG93Qmx1ck91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4gICAgICAgICAgICA8ZmVNZXJnZT4gICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJzaGFkb3dNYXRyaXhPdXRlcjEiPjwvZmVNZXJnZU5vZGU+ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyI+PC9mZU1lcmdlTm9kZT4gICAgICAgICAgICA8L2ZlTWVyZ2U+ICAgICAgICA8L2ZpbHRlcj4gICAgPC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIj4gICAgICAgIDxnIGlkPSJNb2JpbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjkuMDAwMDAwLCAtMTU2LjAwMDAwMCkiIHN0cm9rZT0iIzQ2NDY0NiIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8ZyBpZD0iRmlsdGVycyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDE0MS4wMDAwMDApIj4gICAgICAgICAgICAgICAgPGcgaWQ9IkZpbHRlci1vcGVuIj4gICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC01IiBmaWx0ZXI9InVybCgjZmlsdGVyLTEpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzQuMDAwMDAwLCAxOC4wMDAwMDApIj4gICAgICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT0iMC40MTY2NjY2NjciIHkxPSIwLjQxNjY2NjY2NyIgeDI9IjkuNTgzMzMzMzMiIHkyPSI5LjU4MzMzMzMzIiBpZD0iTGluZS00Ij48L2xpbmU+ICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjAuNDE2NjY2NjY3IiB5MT0iMC40MTY2NjY2NjciIHgyPSI5LjU4MzMzMzMzIiB5Mj0iOS41ODMzMzMzMyIgaWQ9IkxpbmUtNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4wMDAwMDAsIDUuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC01LjAwMDAwMCwgLTUuMDAwMDAwKSAiPjwvbGluZT4gICAgICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICAgICAgPC9nPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==);
          background-size: contain;
          background-repeat: no-repeat;

          position: absolute;
          right: 0;
          top: 0;

          width: 10px;
          height: 10px;
          display: inline-block;
        }
      }
    }

    .form {


      .mx-datepicker {
        width: 100%;
        display: block;
        margin: 0 0 15px 0;

        .form-control {
          margin: 0 0 15px 0;
          display: block;
          width: 100%;
          box-sizing: border-box;

          background: #FFFFFF;
          border: 1px solid #E4E4E4;
          border-radius: 5px;
          padding: 6px 0;
          z-index: 9;
          position: relative;
          text-indent: 25px;

        }

        &:before {
          background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMXB4IiBoZWlnaHQ9IjEwcHgiIHZpZXdCb3g9IjAgMCAxMSAxMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5kb3dubG9hZDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJEZXNrdG9wIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDUuMDAwMDAwLCAtMTk3LjAwMDAwMCkiPiAgICAgICAgICAgIDxnIGlkPSJGaWx0ZXJzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDE0MS4wMDAwMDApIj4gICAgICAgICAgICAgICAgPGcgaWQ9IkRhdGUtaW5wdXQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjAwMDAwMCwgNDYuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICA8aW1hZ2UgaWQ9ImRvd25sb2FkIiB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFIZ0FBQUJ2Q0FZQUFBQW50d1R4QUFBQUJHZEJUVUVBQUxHT2ZQdFJrd0FBQUVSbFdFbG1UVTBBS2dBQUFBZ0FBWWRwQUFRQUFBQUJBQUFBR2dBQUFBQUFBNkFCQUFNQUFBQUJBQUVBQUtBQ0FBUUFBQUFCQUFBQWVLQURBQVFBQUFBQkFBQUFid0FBQUFEYUloNThBQUFFRlVsRVFWUjRBZTJjVzg3aU1BeUZ5MTBJc1FxMnhpTFlCRHZnaFFXeEZ5UWV1TU9NaXp6S3d4REJzUWl4T1pHWWRwcTR0czlYdHlYaVQ2Y0IybncrdndObVdaUFZhdFhKRG5EVVdaTStYVWU2TVZSQUFRSUdSUE5rUXNDZWFBR3hFakFnbWljVEF2WkVDNGlWZ0FIUlBKa1FzQ2RhUUt3RURJam15WVNBUGRFQ1lpVmdRRFJQSnAxUFRLdDVFaUI2ckt6ZzRJUUptSUNES3hBOFBWWXdBUWRYSUhoNnJHQUNEcTVBOFBSWXdRUWNYSUhnNmJHQ0NUaTRBc0hUWXdVVGNIQUZncWZIQ2liZzRBb0VUNDhWVE1EQkZRaWVIaXVZZ0lNckVEdzlWakFCQjFjZ2VIcXNZQUlPcmtEdzlGakJCQnhjZ2VEcHNZSUpPTGdDd2ROakJSTndjQVdDcDhjS0p1RGdDZ1JQanhWTXdNRVZDSjRlSzVpQWd5c1FQRDFXTUFFSFZ5QjRlbjBrdjhWaTBZekg0K1o4UGpmMysyTnQ4RzczY1RPNDNXNk5mT1M0ZkRxZFR2c1JQenBHYlhTTXhpRDk2WGpwbDNOZHI5ZDJPeHdPcy8xcUsrZnA5WHIvL0txZncrSFF4aUI5OGxGLzZsLzY5Unl5bFg0ZEkvKy9YQzV0VHBxZmp0RnpxUjdxVC9wVFgyS3Z0akpHbXZxUXJmUlBKcE4ydTkvdm05UHAxQXdHZ3piLzVYS3BZYjYxaFFEUFpqTVJJc3dLN1c4cDlvWEJmeThLZUlWOVBvTy9BT3hkbDVaYWdnRExiWWF0bkFMeWlFSWJCRmllRjJ6bEZDZ09lTGZibGN1T250b1hNVlFHcUJTbjB5bnFqM2FBQXZyR0RaZzJFR0RFRVcxd0JZcS9aT0doMGhKUndQTE9BMVd3NVphQkpQanJOZ1Q4NjFkQUpuK29naTNQaEV3czdQcUFBZ1Q4QVZGck9pVUV1S1lFR0V0ZUFRTE82K08rbDREZEk4d25RTUI1ZmFyb3RYd3RKZUFxRU9hRElPQzhQdTU3aXdPMk9IU3Y5aGNTc013NzhCYjlCV0R2dWlUZ2R4VnpOcjQ0WUl0RFo5cTZENWUzYVBjSTh3a1FjRjZmS25xTC95YXJpcXgvS0FqTHIxaFp3UTR1Rk1zN0R3RTdBRno4RngyV1o0SURQYXNMc1RoZ3l6T2hPdldDQndUZG91VXYzdGg4S0FBQjlwRmFuQ2d0Yy84RTdPQTZzRHdTQ1ppQUhTZ1FQRVIrRHc0T1dKYUJRQnQwaStiM1lGUnV6SzU0QlZzZStsaUt0RUlWZ0NxWTM0TlJ1Y3ZiUVlETGgwbVBxQUlFakNybnhJNkFuWUJDd3lSZ1ZMbUNkcHlxTENqMk4xd1ZCMnh4K0EyQnZQdTA2QTNkb2kwT3ZZdnRMWDRJc0xja3ZjZHJtYXFFVnBzOUhvK3lsUEM5MzMrWXk5U2xaVHJ0VlFEcUk3MkRwUHY2MDViMFdMci9hdit6ZU5Kei9XK005bXVjTWliZDF4bkE5Rmk2TDhzUnl5UlNla3pPc2QxdVpRTTFDUEJtczJrRTdtZzBhdGVNbHNEa0twUDFqai9aTkhFVlVueWwrNjhDVEczU2ZiVi9sb1A2ZjlZdjUwckhwUHRpSTREVFkrbSs5SXVPRW9Qb0trMDBGcHZpZ05mcmRSc0EvNmxmQVQ2RDYyZGtpcENBVGZMVmIwekE5VE15UlVqQUp2bnFOeWJnK2htWklpUmdrM3oxR3hOdy9ZeE1FUkt3U2I3NmpRbTRma2FtQ0FuWUpGLzl4Z1JjUHlOVGhBUnNrcTkrNHo4cVd5aHdYcjJxbGdBQUFBQkpSVTVFcmtKZ2dnPT0iPjwvaW1hZ2U+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=);
          background-size: contain;
          background-repeat: no-repeat;

          width: 11px;
          height: 10px;
          position: absolute;
          left: 7px;
          top: 9px;
          content: '';
          display: inline-block;

          z-index: 10;
          pointer-events: none;
        }

        &:after {
          background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxNHB4IiBoZWlnaHQ9IjlweCIgdmlld0JveD0iMCAwIDE0IDkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+YXJyb3c8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+ICAgICAgICA8ZyBpZD0iRGVza3RvcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4My4wMDAwMDAsIC0xOTguMDAwMDAwKSIgc3Ryb2tlPSIjMkQ0NTk2IiBzdHJva2Utd2lkdGg9IjIiPiAgICAgICAgICAgIDxnIGlkPSJGaWx0ZXJzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDE0MS4wMDAwMDApIj4gICAgICAgICAgICAgICAgPGcgaWQ9IkRhdGUtaW5wdXQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjAwMDAwMCwgNDYuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iYXJyb3ciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MC4wMDAwMDAsIDEzLjAwMDAwMCkiPiAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSIwLjI5NDExNzY0NyIgeTE9IjAuMjc3Nzc3Nzc4IiB4Mj0iNSIgeTI9IjQuNzIyMjIyMjIiIGlkPSJMaW5lLTIiPjwvbGluZT4gICAgICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT0iNSIgeTE9IjAuMjc3Nzc3Nzc4IiB4Mj0iOS43MDU4ODIzNSIgeTI9IjQuNzIyMjIyMjIiIGlkPSJMaW5lLTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcuMzUyOTQxLCAyLjUwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtNy4zNTI5NDEsIC0yLjUwMDAwMCkgIj48L2xpbmU+ICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=);
          background-size: contain;
          background-repeat: no-repeat;

          width: 10px;
          height: 5px;
          position: absolute;
          right: 8px;
          top: 13px;
          content: '';
          display: inline-block;

          z-index: 10;
          pointer-events: none;
        }

      }

      .submit {
        box-sizing: border-box;
        border: none;
        border-radius: 5px;
        background-color: #2D4596;
        color: #ffffff;

        font-family: Helvetica, sans-serif;
        font-size: 14px;
        letter-spacing: 0;

        width: 100%;
        min-height: 30px;
        text-align: center;

        margin: 0 0 15px 0;
      }

      .clear {
        box-sizing: border-box;
        border: none;
        border-radius: 5px;
        background-color: #EAAC4C;
        color: #ffffff;

        font-family: Helvetica, sans-serif;
        font-size: 14px;
        letter-spacing: 0;

        width: 100%;
        min-height: 30px;
        text-align: center;
      }

      .vdp-datepicker__calendar {
        z-index: 13;
      }
    }
  }

  .content {
    .inner {
      padding: 15px;
    }


    .spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto;

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

    .table {
      width: 100%;
      border: none;
      border-collapse: collapse;

      thead {
        th {

          border: none;
          padding: 0 10px 15px 10px;
          text-align: left;

          &.name {
            width: 75%;

            @media only screen and (max-width: 480px) {
              width: 55%;
            }
          }

          &.date {
            width: 25%;

            @media only screen and (max-width: 480px) {
              width: 45%;
            }
          }

          .link {
            font-family: Helvetica, sans-serif;
            font-size: 14px;
            color: #5E5E5E;
            letter-spacing: 0;
            text-align: left;
            text-decoration: none;
            display: inline-block;


            &.asc {
              &:after {
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1cHgiIGhlaWdodD0iNXB4IiB2aWV3Qm94PSIwIDAgNSA1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPiAgICAgICAgPHRpdGxlPlRyaWFuZ2xlPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9IkRlc2t0b3AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03ODAuMDAwMDAwLCAtMTYyLjAwMDAwMCkiIGZpbGw9IiM1RTVFNUUiPiAgICAgICAgICAgIDxnIGlkPSJEb2N1bWVudHMtbGlzdCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQwLjAwMDAwMCwgMTQxLjAwMDAwMCkiPiAgICAgICAgICAgICAgICA8ZyBpZD0iVGFibGUtaGVhZGVyLWRhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwNS4wMDAwMDAsIDE1LjAwMDAwMCkiPiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNy41MDAwMDAsIDguNTAwMDAwKSBzY2FsZSgxLCAtMSkgdHJhbnNsYXRlKC0zNy41MDAwMDAsIC04LjUwMDAwMCkgIiBwb2ludHM9IjM3LjUgNiA0MCAxMSAzNSAxMSI+PC9wb2x5Z29uPiAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+);
                width: 5px;
                height: 5px;
                vertical-align: top;
                display: inline-block;
                content: '';
                position: relative;
                top: 2px;
                margin-left: 3px;
              }
            }

            &.desc {
              &:after {
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1cHgiIGhlaWdodD0iNXB4IiB2aWV3Qm94PSIwIDAgNSA1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPiAgICAgICAgPHRpdGxlPlRyaWFuZ2xlPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9IkRlc2t0b3AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03ODAuMDAwMDAwLCAtMTYyLjAwMDAwMCkiIGZpbGw9IiM1RTVFNUUiPiAgICAgICAgICAgIDxnIGlkPSJEb2N1bWVudHMtbGlzdCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQwLjAwMDAwMCwgMTQxLjAwMDAwMCkiPiAgICAgICAgICAgICAgICA8ZyBpZD0iVGFibGUtaGVhZGVyLWRhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwNS4wMDAwMDAsIDE1LjAwMDAwMCkiPiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNy41MDAwMDAsIDguNTAwMDAwKSBzY2FsZSgxLCAtMSkgdHJhbnNsYXRlKC0zNy41MDAwMDAsIC04LjUwMDAwMCkgIiBwb2ludHM9IjM3LjUgNiA0MCAxMSAzNSAxMSI+PC9wb2x5Z29uPiAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+);
                width: 5px;
                height: 5px;
                vertical-align: top;
                display: inline-block;
                content: '';
                position: relative;
                top: 2px;
                transform: rotate(180deg);
                margin-left: 3px;
              }
            }
          }

          & + th {
            padding: 0 10px 15px 25px;
          }
        }
      }

      tbody {
        tr {
          &.odd {
            td {
              background: #fff;
            }
          }

          &.even {
            td {
              background: #CBCBCB;
            }
          }

          td {
            height: 33px;
            max-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            .text {
              font-family: Helvetica, sans-serif;
              font-size: 14px;
              color: #5E5E5E;
              letter-spacing: 0;
              text-align: left;
              border: none;
              padding: 0 10px;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: inline-block;
              width: 100%;
              overflow: hidden;
            }

          }
        }
      }
    }

    .pagination {

      text-align: right;
      margin: 15px 0 0 0;

      .counter {
        display: inline-block;
        vertical-align: middle;
        padding: 0 10px 0 1px;

        font-family: Helvetica, sans-serif;
        font-size: 14px;
        color: #001C7B;
        letter-spacing: 0;
        text-align: left;
      }

      .btn {
        width: 22px;
        height: 22px;
        background: #fff;
        display: inline-block;
        border: 1px solid #001c7b;
        padding: 0;

        font-family: HelveticaNeue, Helvetica, sans-serif;
        font-size: 14px;
        color: #001C7B;

        margin: 0 9px 0 0;
      }

    }

  }

  .row {
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;

    .col {
      flex-basis: 0;
      flex-grow: 1;
      min-width: 0;
      max-width: 100%;
    }

    .col-auto {
      flex: 0 0 auto;
      width: auto;
      max-width: 100%;
      position: relative;
    }
  }

  .bg {
    background: #E0E0E0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.20);
    border-radius: 5px;
  }
}
</style>
