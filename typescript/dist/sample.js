(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("./index");
    async function cook() {
        const materials = {
            A: [
                new index_1.Material("醤油", "1升"),
                new index_1.Material("味噌", "1kg", "麴入り味噌がよい。信州みそでも美味しくできた。"),
                new index_1.Material("黒砂糖", "1kg"),
            ],
            B: [
                new index_1.Material("ニンニク", "200g"),
                new index_1.Material("生姜", "200g"),
                new index_1.Material("バナナ", "1本"),
                new index_1.Material("リンゴ", "1個"),
                new index_1.Material("海苔の佃煮", "200g"),
                new index_1.Material("白ごま", "適量"),
                new index_1.Material("七味", "15g", "一味でもよい。ちょっと多いとピリ辛になる。"),
                new index_1.Material("日本酒", "1升", "安物でよい。"),
            ],
            C: [
                new index_1.Material("ハチミツ", "500g", "蜜柑でつくっている。他のハチミツでどうなるかは未検証。"),
            ],
        };
        const ochawan = new index_1.Container("お茶碗");
        ochawan.put([
            new index_1.Material("焼き牛カルビ", "二切れ", "焼いたやーつ"),
            new index_1.Material("米", "大盛り", "あっつあつ"),
        ]);
        const pan = new index_1.Pan("きったねえフライパン");
        const bowl = new index_1.Container("ボウル");
        const grater = new index_1.Grater("おろし金");
        await index_1.cookHidenNoTare(materials, {
            pan,
            mixableWare: {
                bowl,
                grater,
            },
        });
        pan.takeOut(ochawan);
        console.log(ochawan);
        console.log("うんめ～～～～～！！！！！");
    }
    cook();
});
//# sourceMappingURL=sample.js.map