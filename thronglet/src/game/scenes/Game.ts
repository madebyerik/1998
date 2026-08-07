import Phaser from "phaser";
import { createIsoMap } from "../assets/maps/IsoMap";
import { Thronglet } from "../entities/Thronglet/Thronglet";
import { Egg } from "../entities/Thronglet/Egg";
import { ItemsToolbar } from "../ui/ItemsToolbar";
import { StatsToolbar } from "../ui/StatsToolbar";
// import { ShareToolbar } from "../ui/ShareToolbar";
import { GameOverModal } from "../ui/GameOverModal";
import { Apple } from "../entities/items/Apple";
import { Ball } from "../entities/items/Ball";
import { registerItemAnimations } from "../entities/items/ItemAnimations";
import { registerThrongletAnimations } from "../entities/Thronglet/ThrongletAnimations";
import { WorldItem } from "../entities/items/WorldItem";
import { EventBus } from "../EventBus";

export class Game extends Phaser.Scene {
  public map!: Phaser.Tilemaps.Tilemap;
  public thronglet!: Thronglet;
  public itemsToolbar!: ItemsToolbar;
  // public shareToolbar!: ShareToolbar;
  public statsToolbar!: StatsToolbar;
  public gameOverModal!: GameOverModal;

  public worldItems: WorldItem[] = [];

  constructor() {
    super("Game");
    EventBus.on("thronglet-died", () => {
      this.handleGameOver();
    });
  }

  public removeWorldItem(item: WorldItem) {
    this.worldItems = this.worldItems.filter(i => i !== item);
  }

  public spawnWorldItem(type: string, x: number, y: number) {
    let item: WorldItem | null = null;
    switch (type) {
      case "apple":
        item = new Apple(this, x, y);
        break;
      case "ball":
        item = new Ball(this, x, y);
        break;
    }

    if (item) {
      this.worldItems.push(item);
      return item;
    }
  }

  public createUI() {
    const itemsToolbar = new ItemsToolbar(this);
    this.itemsToolbar = itemsToolbar;
    const statsToolbar = new StatsToolbar(this);
    this.statsToolbar = statsToolbar;
    // const shareToolbar = new ShareToolbar(this);
    // this.shareToolbar = shareToolbar;
    const gameOverModal = new GameOverModal(this);
    this.gameOverModal = gameOverModal;
  }

  public destroyUI() {
    this.itemsToolbar.destroy();
    this.statsToolbar.destroy();
    // this.shareToolbar.destroy();
    this.gameOverModal.destroy();
  }

  public spawnThronglet() {
    const thronglet = new Thronglet(this);
    this.thronglet = thronglet;
    thronglet.setAction("pathing");
    this.createUI();
  }

  private createStarField() {
    const stars = this.add.graphics();

    for (let i = 0; i < 120; i++) {
      const brightness = Phaser.Math.FloatBetween(0.45, 1);

      stars.fillStyle(0xffffff, brightness);
      stars.fillCircle(
        Phaser.Math.Between(0, this.scale.width),
        Phaser.Math.Between(0, this.scale.height),
        Phaser.Math.FloatBetween(0.5, 1.5)
      );
    }
  }

  private handleGameOver() {
    this.gameOverModal.show();
  }

  create() {
    registerThrongletAnimations(this);
    registerItemAnimations(this);
    this.createStarField();
    createIsoMap(this);
    if (this.registry.get("initialState")) {
      this.spawnThronglet();
    } else {
      new Egg(this);
    }
    EventBus.emit('current-scene-ready', this);
  }
}