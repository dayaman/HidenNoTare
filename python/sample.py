from main import Container, Material, Pan, Grater, cook_hiden_no_tare


def cook():
    materials = {
        "A": [
            Material("醤油", "1升"),
            Material("味噌", "1kg", "麴入り味噌がよい。信州みそでも美味しくできた。"),
            Material("黒砂糖", "1kg"),
        ],
        "B": [
            Material("ニンニク", "200g"),
            Material("生姜", "200g"),
            Material("バナナ", "1本"),
            Material("リンゴ", "1個"),
            Material("海苔の佃煮", "200g"),
            Material("白ごま", "適量"),
            Material("七味", "15g", "一味でもよい。ちょっと多いとピリ辛になる。"),
            Material("日本酒", "1升", "安物でよい。"),
        ],
        "C": [
            Material("ハチミツ", "500g", "蜜柑でつくっている。他のハチミツでどうなるかは未検証。"),
        ],
    }
    ochawan = Container("お茶碗")
    ochawan.put(
        [
            Material("焼き牛カルビ", "二切れ", "焼いたやーつ"),
            Material("米", "大盛り", "あっつあつ"),
        ]
    )
    pan = Pan("きったねえフライパン")
    bowl = Container("ボウル")
    grater = Grater("おろし金")
    cook_hiden_no_tare(
        materials,
        {
            "pan": pan,
            "mixable_ware": {
                "bowl": bowl,
                "grater": grater,
            },
        },
    )

    pan.take_out(ochawan)

    print("うんめ～～～～～！！！！！")


if __name__ == "__main__":
    cook()
