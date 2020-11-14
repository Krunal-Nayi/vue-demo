<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader> Users </CCardHeader>
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
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center' }"
            @page-change="pageChange"
          >
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from "axios";
// import { getAllUsers, getUser } from "@/api/users.api";

const fields = [
  "id",
  { key: "name", label: "Name", _classes: "font-weight-bold" },
  "email",
  "phone",
  { key: "companyname", label: "Company", _classes: "font-weight-bold" },
];

export default {
  name: "Users",
  data() {
    return {
      items: this.items,
      fields: fields,
      activePage: 1,
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
      url: "https://jsonplaceholder.typicode.com/users",
    }).then(
      (result) => {
        this.items = result.data.map((item) => {
          return {
            ...item,
            companyname: item.company.name,
          };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  },

  methods: {
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    rowClicked(item, index) {
      this.$router.push({ path: `users/${item.id}` });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
  },
};
</script>
