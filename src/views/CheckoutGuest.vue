<template>
    <div class="container mb-3">
        <div>
            <p class="fs-4 fw-bold">Checkout</p>
        </div>
        <div class="row">
            <div class="col-md-8">
                <div class="mb-4">
                    <p class="mb-2 text-dark h6">Personal Information</p>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="fname" placeholder="name@example.com" v-model="data.user.firstName">
                                <label for="fname">First Name</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="lname" placeholder="name@example.com" v-model="data.user.lastName">
                                <label for="lname">Last Name</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="form-floating">
                                <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="data.user.email">
                                <label for="email">Email Address</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="pnum" placeholder="name@example.com" v-model="data.user.phone">
                                <label for="pnum">Phone Number</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-4" v-if="deliveryMode == 'Delivery'">
                    <p class="mb-2 text-dark h6">Delivery Address</p>
                    <div class="mb-3">
                        <div class="form-floating">
                            <GMapAutocomplete
                                placeholder="Where are you at?"
                                @place_changed="Location"
                                class="form-control"
                                 id="sAddr"
                                
                            >
                            </GMapAutocomplete>
                            <label for="sAddr">Street Address</label>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a note here" id="delivery_note" v-model="data.note"></textarea>
                            <label for="delivery_note">Delivery note</label>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="mb-2 text-dark h6">Payment Method</p>
                    <div class="shadow-sm border p-2 rounded col-md-3">
                        <div class="form-check">
                            <label class="form-check-label" for="flutterradio">
                                <img src="@/assets/images/flutterwave.svg" alt="" width="16" height="16" class="me-1">
                                Flutterwave
                            </label>
                            <input class="form-check-input"  type="radio" name="flutterradio" id="flutterradio" value="pay_now" v-model="data.payMethod">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <OrderSummaryCheckout :data="data" />
            </div>
        </div>
        <Alert :message="$store.state.message" category="alert" :success="$store.state.success" :link="false" />
    </div>
</template>
<script>
import OrderSummaryCheckout from "@/components/OrderSummaryCheckout.vue";
import {mapGetters} from 'vuex'
import Alert from "../components/Alert.vue";
export default {
    name: "CheckoutGuest",
    components: { OrderSummaryCheckout, Alert },
    data(){
        return{
            data: {
                user: {},
                currentPlace: {
                    street: "",
                    location: {}
                },
                payMethod: 'pay_now'
            }
        }
    },
    methods:{
        Location(place){
            this.data.currentPlace.street = place.formatted_address;
        }
    },
    computed:{
        ...mapGetters(['deliveryMode'])
    }
}
</script>
<style scoped>
    label{
        --bs-text-opacity: 1;
        color: rgba(var(--bs-secondary-rgb),var(--bs-text-opacity));
    }
</style>