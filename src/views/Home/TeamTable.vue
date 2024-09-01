<template>
    <div class="team_table">
        <div class="tr" style="background-color: #232323;">
            <div class="td">注册时间</div>
            <div class="td">用户名</div>
            <div class="td">充值金额</div>
            <div class="td">提现金额</div>
        </div>
        <div class="tr">
            <div class="td">注册时间</div>
            <div class="td">用户名</div>
            <div class="td">充值金额</div>
            <div class="td">提现金额</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.team_table {
    .tr {
        display: flex;
        align-items: stretch;
        background-color: #343445;

        .td {
            flex: 1;
            height: 12rem;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            word-break: break-all;
        }
    }
}
</style>