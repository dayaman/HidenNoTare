export class Material {
    constructor(
        public name: string,
        public amount: string,
        public note?: string
    ) { }
    divisions(part: number) {
        return [...Array(part).keys()].map(
            (i) =>
                new Material(
                    `${this.name} (1/${part})`,
                    `${this.amount} (1/${part})`,
                    this.note
                )
        );
    }
}

async function Sleep(s: number) {
    console.log(`${s} 秒作業`);
    return;
}

// Exceptions
export class ZairyoTarinaiError extends Error {
    constructor(requiredMaterialName: string) {
        super(`必要素材 "${requiredMaterialName}" が見つかりませんでした。`);
    }
}

export interface MaterialGroups {
    A: Material[];
    B: Material[];
    C: Material[];
}

export class Container {
    constructor(public name: string) { }
    materials: Material[] = [];
    put(materials: Material[]) {
        this.materials.push(...materials);
        console.log(
            `${materials.map((m) => m.name).join(",")} を ${this.name} に追加した`
        );
    }
    push(material: Material) {
        this.materials.push(material);
        console.log(`${this.name} に ${material.name} を追加した`);
    }
    takeOut(container: Container) {
        container.materials.push(...this.materials);
        this.materials = [];
        console.log(`${this.name} から ${container.name} に移し替えた`);
    }
    async mix(): Promise<void> {
        let buf: Material[] = [];
        let length = this.materials.length;
        for (let i = 0; i < length; i++) {
            buf.push(
                this.materials.splice(
                    Math.floor(Math.random() * this.materials.length),
                    1
                )[0]
            );
        }
        this.materials = buf;
        console.log(`${this.name} を混ぜた`);
    }
}

export class Pan extends Container {
    async heating(level: "弱火" | "中火" | "強火"): Promise<void> {
        console.log(`${level} で ${this.name} を加熱した`);
        await Sleep(120);
        this.materials.forEach((m) => (m.name = `${level}で加熱した ${m.name}`));
    }
    async cooled(): Promise<void> {
        console.log(`${this.name} から粗熱を取った`);
        await Sleep(300);
        this.materials.forEach((m) => (m.name = `粗熱を取った ${m.name}`));
    }
}

export class Mixer extends Container {
    async mix(): Promise<void> {
        super.mix();
        console.log(`${this.name} でミキサー処理をした`);
        await Sleep(20);
        this.materials.forEach(
            (m) => (m.name = m.name = `ミキサー処理された ${m.name}`)
        );
    }
}

export class Grater {
    constructor(public name: string) { }
    async grate(material: Material): Promise<void> {
        console.log(`${this.name} で　${material.name} をすりおろした`);
        await Sleep(120);
        material.name = `すりおろされた ${material.name}`;
    }
}

export interface RequireKitcheneWares {
    pan: Pan;
    mixableWare:
    | Mixer
    | {
        grater: Grater;
        bowl: Container;
    };
}

export async function cookHidenNoTare(
    materialGroups: MaterialGroups,
    kitchenware: RequireKitcheneWares
) {
    const { A, B, C } = materialGroups;
    const { pan, mixableWare } = kitchenware;

    console.log(
        `1. Aをすべて鍋に入れ、弱火で煮込む。焦げ付かないように適度に混ぜる。`
    );
    console.group();

    pan.put(A);
    await pan.heating("弱火");
    await pan.mix();

    console.groupEnd();

    const Sake = B.find((m) => m.name === "日本酒");
    if (!Sake) throw new ZairyoTarinaiError("日本酒");

    B.splice(
        B.findIndex((m) => m === Sake),
        1
    );

    if (mixableWare instanceof Mixer) {
        console.log(`2-a. Bから酒以外をミキサーにかけ、徐々に酒を足す。`);
        console.group();

        const divisionedSake = Sake.divisions(10);
        mixableWare.put(B);
        for (let i = 0; i < 10; i++) {
            mixableWare.push(divisionedSake.pop()!);
            await mixableWare.mix();
        }
    } else {
        console.log(`2-b. ミキサーがない場合は、すりおろして混ぜる。`);
        console.group();

        const { bowl, grater } = mixableWare;
        const divisionedSake = Sake.divisions(B.length);

        for (let material of B) {
            await grater.grate(material);
            bowl.push(divisionedSake.pop()!);
            bowl.push(material);
            await bowl.mix();
        }
    }
    console.groupEnd();

    console.log(`3. 混ぜたBをAにいれ、弱火で煮込む。`);
    console.group();

    if (mixableWare instanceof Mixer) {
        mixableWare.takeOut(pan);
    } else {
        mixableWare.bowl.takeOut(pan);
    }
    await pan.heating("弱火");

    console.groupEnd();
    console.log(`4. 沸騰後15~20分ほど煮込んだら火からおろし、粗熱を取る。`);
    console.group();

    await Sleep(15 * 60);
    await pan.cooled();

    console.groupEnd();
    console.log(`5. ハチミツを混ぜ入れて完成。`);
    console.group();

    const Hachimitsu = C.find((m) => m.name === "ハチミツ");
    if (!Hachimitsu) throw new ZairyoTarinaiError("ハチミツ");
    pan.push(Hachimitsu);
    console.groupEnd();
}
