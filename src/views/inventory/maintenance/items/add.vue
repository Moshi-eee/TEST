<script setup>
import { ref } from "vue";
import { useAssetMaintenanceStore } from "@/stores/assetMaintenanceStore";

const assetStore = useAssetMaintenanceStore();
const dialog = defineProps({ dialog: Object, form: Object });

const category_data = assetStore.get_category.data.data;
const location_data = assetStore.get_location.data.data;
const brand_data = assetStore.get_brand.data.data;
const type_data = assetStore.get_type.data.data;

const rules = ref({
  code: [(v) => !!v || "Required Field"],
  name: [(v) => !!v || "Required Field"],
  asset_category_id: [(v) => !!v || "Required Field"],
  asset_locations_id: [(v) => !!v || "Required Field"],
  asset_item_brands_id: [(v) => !!v || "Required Field"],
  asset_types_id: [(v) => !!v || "Required Field"],
  description: [(v) => !!v || "Required Field"],
});

const emit = defineEmits(["dialog"], ["save"]);

//#region close the dialog
const Close = () => {
  emit("dialog", false);
};
//#endregion

const save = () => {
  try {
    emit("save", dialog.form);
  } catch (e) {
    console.log(e);
  }
};

const convertToBase64 = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    dialog.form.picture_path = reader.result;
  };
  reader.onerror = (error) => {
    console.log("Error: ", error);
  };
};
</script>

<template>
  <v-dialog v-model="dialog.dialog" width="1080px">
    <v-card>
      <v-form validate-on="submit" @submit.prevent="save">
        <v-card-title align="center">
          <span class="text-h5 pa-2">New Item</span>
        </v-card-title>
        <br />
        <v-card-text align="center">
          <v-row>
            <v-col cols="12" md="3">
              <v-autocomplete
                density="compact"
                variant="underlined"
                label="Select item type"
                v-model="dialog.form.asset_types_id"
                :rules="rules.asset_types_id"
                :items="type_data"
                item-title="code"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                density="compact"
                variant="underlined"
                label="Select item category"
                v-model="dialog.form.asset_category_id"
                :rules="rules.asset_category_id"
                :items="category_data"
                item-title="code"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                density="compact"
                variant="underlined"
                label="Select item brand"
                v-model="dialog.form.asset_item_brands_id"
                :rules="rules.asset_item_brands_id"
                :items="brand_data"
                item-title="code"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                density="compact"
                variant="underlined"
                label="Select item location"
                v-model="dialog.form.asset_locations_id"
                :rules="rules.asset_locations_id"
                :items="location_data"
                item-title="code"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                required
                density="compact"
                variant="underlined"
                label="Enter item code"
                v-model="dialog.form.code"
                :rules="rules.code"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-file-input
                label="Picture *"
                accept="image/*"
                clearable
                required
                density="compact"
                variant="underlined"
                @change="convertToBase64"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                required
                density="compact"
                variant="underlined"
                label="Enter minimum quantity"
                v-model="dialog.form.minimum_qty"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                required
                density="compact"
                variant="underlined"
                label="Enter item name"
                v-model="dialog.form.name"
                :rules="rules.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-textarea
                label="Enter item description"
                required
                rows="3"
                type="type"
                density="compact"
                variant="underlined"
                v-model="dialog.form.description"
                :rules="rules.description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" type="submit">
            Submit
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="Close">
            Close
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
