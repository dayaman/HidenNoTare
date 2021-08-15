import { Material, Container, Pan, Grater, cookHidenNoTare } from "./index";

async function cook() {
    const materials = {
        A: [
            new Material("醤油", "1升"),
            new Material(
                "味噌",
                "1kg",
                "麴入り味噌がよい。信州みそでも美味しくできた。"
            ),
            new Material("黒砂糖", "1kg"),
        ],
        B: [
            new Material("ニンニク", "200g"),
            new Material("生姜", "200g"),
            new Material("バナナ", "1本"),
            new Material("リンゴ", "1個"),
            new Material("海苔の佃煮", "200g"),
            new Material("白ごま", "適量"),
            new Material("七味", "15g", "一味でもよい。ちょっと多いとピリ辛になる。"),
            new Material("日本酒", "1升", "安物でよい。"),
        ],
        C: [
            new Material(
                "ハチミツ",
                "500g",
                "蜜柑でつくっている。他のハチミツでどうなるかは未検証。"
            ),
        ],
    };
    const ochawan = new Container("お茶碗");
    ochawan.put([
        new Material("焼き牛カルビ", "二切れ", "焼いたやーつ"),
        new Material("米", "大盛り", "あっつあつ"),
    ]);
    const pan = new Pan("きったねえフライパン");
    const bowl = new Container("ボウル");
    const grater = new Grater("おろし金");

    await cookHidenNoTare(materials, {
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