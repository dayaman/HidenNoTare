from __future__ import annotations

import random
from typing import TypedDict, List, Literal, Union


class Material:
    def __init__(self, name: str, amount: str, note: str = None):
        self.name = name
        self.amount = amount
        self.note = note

    def divisions(self, part: int) -> List[Material]:
        ret = []
        for _ in range(part):
            ret.append(Material(f"{self.name} (1/{part})", f"{self.amount} (1/{part})", self.note))
        return ret


def sleep(seconds: int) -> None:
    print(f"{seconds} 秒作業")


class ZairyoTarinaiError(Exception):
    def __init__(self, material: str):
        super().__init__(f"必要素材 {material} が見つかりませんでした。")


class Container:
    def __init__(self, name: str):
        self.name = name
        self.materials = []

    def put(self, materials: List[Material]) -> None:
        self.materials.extend(materials)
        print(f"{', '.join(map(lambda m: m.name, materials))} を {self.name} に追加した")

    def push(self, material: Material) -> None:
        self.put([material])

    def take_out(self, container: Container) -> None:
        container.materials.extend(self.materials)
        self.materials.clear()
        print(f"{self.name} から {container.name} に移し替えた")

    def mix(self) -> None:
        random.shuffle(self.materials)
        print(f"{self.name} を混ぜた")

    def inspect(self) -> None:
        ret = f"{self.name} には\n"
        for material in self.materials:
            ret += f" {material.name} ({material.amount})\n"
        ret += "が入っている"
        print(ret)


class Pan(Container):
    def heating(self, level: Literal["弱火", "中火", "強火"]) -> None:
        print(f"{level} で {self.name} を加熱した")
        sleep(120)
        for material in self.materials:
            material.name = f"{level} で加熱した {material.name}"

    def cooled(self) -> None:
        print(f"{self.name} から粗熱を取った")
        sleep(300)
        for material in self.materials:
            material.name = f"粗熱を取った {material.name}"


class Mixer(Container):
    def mix(self) -> None:
        super
        print(f"{self.name} でミキサー処理した")
        sleep(20)
        for material in self.materials:
            material.name = f"ミキサー処理した {material.name}"


class Grater:
    def __init__(self, name: str):
        self.name = name

    def grate(self, material: Material) -> None:
        print(f"{self.name} で {material.name} をすりおろした")
        sleep(120)
        material.name = f"すりおろされた {material.name}"


class MaterialGroups(TypedDict):
    A: List[Material]
    B: List[Material]
    C: List[Material]


class MixableWareAlt(TypedDict):
    grater: Grater
    bowl: Container


class KitchenWare(TypedDict):
    pan: Pan
    mixable_ware: Union[Mixer, MixableWareAlt]


def cook_hiden_no_tare(material_groups: MaterialGroups, kitchen_ware: KitchenWare) -> Pan:
    A, B, C = material_groups["A"], material_groups["B"], material_groups["C"]
    pan = kitchen_ware["pan"]

    print("1. Aをすべて鍋に入れ、弱火で煮込む。焦げ付かないように適度に混ぜる。")

    pan.put(A)
    pan.heating("弱火")
    pan.mix()

    if not (sake := next(filter(lambda e: e.name == "日本酒", B), None)):
        raise ZairyoTarinaiError("日本酒")

    B.remove(sake)
    mixable_ware = kitchen_ware["mixable_ware"]
    print("")

    if isinstance(mixable_ware, Mixer):
        print("2-a. Bから酒以外をミキサーにかけ、徐々に酒を足す。")

        divisioned_sake = sake.divisions(10)
        mixable_ware.put(B)
        for _ in range(10):
            mixable_ware.push(divisioned_sake.pop())
            mixable_ware.mix()
    else:
        print("2-b. ミキサーがない場合は、すりおろして混ぜる。")

        bowl, grater = mixable_ware["bowl"], mixable_ware["grater"]
        divisioned_sake = sake.divisions(len(B))

        for material in B:
            grater.grate(material)
            bowl.push(divisioned_sake.pop())
            bowl.push(material)
            bowl.mix()

    print("\n3. 混ぜたBをAにいれ、弱火で煮込む。")

    if isinstance(mixable_ware, Mixer):
        mixable_ware.take_out(pan)
    else:
        bowl.take_out(pan)
    pan.heating("弱火")

    print("\n4. 沸騰後15~20分ほど煮込んだら火からおろし、粗熱を取る。")

    sleep(15 * 60)
    pan.cooled()

    print("\n5. ハチミツを混ぜ入れて完成。")

    if not (hachimitu := next(filter(lambda e: e.name == "ハチミツ", C), None)):
        raise ZairyoTarinaiError("ハチミツ")
    pan.push(hachimitu)
    pan.mix()
    return pan
