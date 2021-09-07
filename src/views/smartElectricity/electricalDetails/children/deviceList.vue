<template>
    <div>
        <div class="deviceTitle">
            设备类型列表
        </div>
        <div class="deviceList">
            <!--默认设备选中状态-->
            <a-tree
                    show-line
                    :tree-data="deviceList"
                    :default-expanded-keys="deviceType"
                    :default-selected-keys="deviceId"
                    :replace-fields="replaceFields"
                    @select="onSelect"
            />
        </div>
    </div>

</template>

<script>

    const deviceList = [
        {
            name: '水表设备',
            key: '0',
            child: [
                {key: '00', name: '水表设备01'},
                {key: '01', name: '水表设备02'},
                {key: '02', name: '水表设备03'}
            ]
        },
        {
            name: '电表设备',
            key: '1',
            child: [
                {key: '10', name: '电表设备01'},
                {key: '11', name: '电表设备02'},
                {key: '12', name: '电表设备03'}
            ]
        }
    ];

    export default {
        name: "deviceList",
        props: {},
        data() {
            return {
                deviceList,
                deviceType: ['0'], // 默认，第1类设备类型
                newDeviceId: [],
                deviceId: ['00'], // 默认1号设备
                replaceFields: {
                    children: 'child',
                    title: 'name',
                }
            }
        },
        watch: {
            deviceId(newVal, oldVal) {
                this.newDeviceId = newVal;
                // console.log(newVal + "--" + oldVal);
            },
        },
        mounted() {
            this.loadDeviceLists();
        },
        methods: {
            loadDeviceLists() {

            },
            onSelect(id) {
                const arr = id.length;
                this.deviceId = arr != 0 ? id : this.newDeviceId;
                if (arr != 0) {
                    // console.log("new: "+ id[0]);
                    this.$emit("selectedDevice", { id: id[0], code: 0});
                } else {
                    // console.log("old: "+ this.newDeviceId);
                    this.$emit("selectedDevice", { id: this.newDeviceId, code: 1} );
                }
            }
        }
    };
</script>

<style scoped lang="less">
    .deviceTitle {
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: 600;
    }
</style>
