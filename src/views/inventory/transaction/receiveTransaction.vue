<script setup>
const dialog = defineProps({ dialog: Object, item: Object, type: Object });

const emit = defineEmits(["close"], ["item"]);

const Close = () => {
  emit("close", false);
};

const save = (status) => {
  dialog.item.status_asset = status;

  emit("item", dialog.item);
};
</script>
<template>
  <v-dialog v-model="dialog.dialog" width="700">
    <v-card>
      <v-card-title align="center">
        <span class="text-h5 pa-2">
          <p>
            <b>
              {{ dialog.item.request.invoice_no }}
            </b>
            ({{
              dialog.item.request.type == "In"
                ? "Stock In"
                : dialog.item.request.type == "Out"
                ? "Stock Out"
                : dialog.item.request.type == "Transfer Out"
                ? "Request Asset"
                : dialog.item.request.type
            }})
          </p>
          <h5>({{ dialog.item.request.title }})</h5>
        </span>
      </v-card-title>
      <v-card-text align="center">
        <v-row>
          <v-col cols="12" md="6">
            <p v-if="dialog.item.request.user_id != null">
              <b>Requestor: </b>{{ dialog.item.request.userprofile.first_name }}
              {{ dialog.item.request.userprofile.middle_name }}
              {{ dialog.item.request.userprofile.last_name }} ({{
                dialog.item.request.userprofile.emp_code
              }}/{{ dialog.item.request.userprofile.department.name }})
            </p>

            <b>Item Name: </b>{{ dialog.item.item.name }}
          </v-col>
          <v-col cols="12" md="6">
            <b>Item Type: </b>{{ dialog.item.item.type.code }} <br />
            <b>Item Brand: </b>{{ dialog.item.item.brand.code }}
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              required
              density="compact"
              variant="underlined"
              label="Enter Serial Number"
              v-model="dialog.item.serial"
              v-if="dialog.item.request.type == 'Transfer Out'"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              required
              density="compact"
              variant="underlined"
              label="Enter Internal Serial Number"
              v-model="dialog.item.internal_serial"
              v-if="dialog.item.request.type == 'Transfer Out'"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" @click="Close"> Close </v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" color="blue-darken-1"> Submit </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in dialog.type"
              :key="index"
              :value="index"
            >
              <v-btn
                color="blue-darken-1"
                block
                variant="plain"
                @click="save(item)"
              >
                {{ item }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
