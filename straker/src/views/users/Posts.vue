<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader> Posts | User id: {{ $route.params.id }} </CCardHeader>
        <CCardBody>
          <CDataTable
            hover
            sorter
            striped
            :items="items"
            :fields="fields"
            :items-per-page="5"
            column-filter
            table-filter
            :active-page="activePage"
            :pagination="{ doubleArrows: false, align: 'center' }"
            @page-change="pageChange"
          >
            <template #show_posts="{ item, index }">
              <td class="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  square
                  size="sm"
                  @click="togglePost(item, index)"
                >
                  {{ Boolean(item._toggled) ? "Hide" : "Show" }}
                </CButton>
              </td>
            </template>

            <template #details="{ item }">
              <CCollapse
                :show="Boolean(item._toggled)"
                :duration="collapseDuration"
              >
                <CCardBody>
                  <CMedia :aside-image-props="{ height: 102 }">
                    <h4>
                      {{ item.title }}
                    </h4>
                    <p class="text-muted">User since: {{ item.body }}</p>

                    <CButton size="sm" color="danger" class="ml-1">
                      Delete
                    </CButton>
                  </CMedia>
                </CCardBody>
              </CCollapse>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from "axios";
// import { getAllPosts, getPost } from "@/api/posts.api";

const fields = [
  "id",
  { key: "title", _classes: "font-weight-bold" },
  "body",
  {
    key: "show_posts",
    label: "Action",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "Posts",
  data() {
    return {
      items: this.items,
      fields: fields,
      activePage: 1,
      details: [],
      collapseDuration: 0,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page);
        }
      },
    },
  },

  mounted() {
    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then(
      (result) => {
        const userId = this.$route.params.id;
        const values = result.data.filter((post) => post.userId == userId);
        this.items = values.map((item, id) => {
          id = id + 1;
          return { ...item, id };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  },

  methods: {
    togglePost(item) {
      console.log(item);

      this.$set(this.items[item.id - 1], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/users" });
    },
  },
};
</script>
