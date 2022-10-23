import { Actor, Color, DisplayMode, Engine, ExitTriggerEvent, Font, Loader, Input, Label, vec, TextAlign } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';
import { Resources } from './resources';
import { RButton } from './ui/rbutton'

class GameStats {
  kills : number = 0;
  points : number = 0;
}

/**
 * Managed game class
 */
class Game extends Engine {
  
  public gameStats : GameStats = new GameStats;
  public player: Player;
  private pointsText : Label;
  private levelOne: LevelOne;

  constructor() {
    super({ displayMode: DisplayMode.FillScreen });
  }

  public start() {
    const windowBounds = window.document.body.getBoundingClientRect();
    const screenCenter = vec(windowBounds.width / 2, windowBounds.height / 2)
    // Create new scene with a player
    this.levelOne = new LevelOne();
    this.player = new Player();
    this.player.pos = screenCenter.clone();
    this.player.on('moved', (evt: ExitTriggerEvent) => { console.log(evt); });
    this.levelOne.add(this.player);

    const pointsText = () => `Points: ${this.gameStats.points}  Kills: ${this.gameStats.kills}`;
    // todo: create ui text class
    this.pointsText = new Label({
      pos: vec(70, 100),
      text: pointsText(),
      font: new Font({ 
        size: 30, 
        color: Color.White, 
        textAlign: TextAlign.Left,
        family: 'monospace' }),
    });
    this.levelOne.add(this.pointsText);

    const newMob = () => {
      const playerMob = new Player({ health: 400, velocity: 100 });
      const screenCenter = vec(windowBounds.width / 2, windowBounds.height / 2)
      const yShift = Math.random() * 200;
      const xShift = Math.random() * 300;
      playerMob.color = Color.Red;
      playerMob.pos = vec(screenCenter.x + xShift , screenCenter.y + yShift);
      this.levelOne.add(playerMob);
    };

    newMob();
    this.levelOne.on('kill-unit', (event) => { 
      console.log(event);
      const mob : Player = event['unit'];
      this.gameStats.kills++;
      this.gameStats.points += mob.savedOpts.health / 10;
      console.log(this.gameStats)
      this.pointsText.text = pointsText();
      const resTime = 600;
      setTimeout(() => newMob(), resTime);
      setTimeout(() => newMob(), resTime * 2);
    });

    let shootTime : number = 0;
    const shootInterval : number = 300;

    this.on('postupdate', (event) => {
      if (shootTime > 0)
        shootTime -= event.delta;
      if (event.engine.input.keyboard.isHeld(Input.Keys.Space) && shootTime <= 0) {
        this.player.shoot(this.levelOne.engine.input.pointers.primary.lastWorldPos);
        shootTime = shootInterval;
      }
    })

    // const startBtn : RButton = new RButton(windowBounds.width / 2, windowBounds.height / 2);
    // this.levelOne.add(startBtn);

    game.backgroundColor = Color.Black;
    game.add('levelOne', this.levelOne);

    // Automatically load all default resources
    const loader = new Loader(Object.values(Resources));

    return super.start(loader);
  }

  // override onPostUpdate(_engine: Engine, _delta: number) {
  //   if (this._shootTime > 0)
  //     this._shootTime -= _delta;
  //   if (_engine.input.keyboard.isHeld(Input.Keys.Space) && this._shootTime <= 0) {
  //     this.player.shoot();
  //     this._shootTime = this._shootInterval;
  //   }
  // }
}

const game = new Game();
game.start().then(() => {
  game.goToScene('levelOne');
  const engine = game.currentScene.engine;
  const player = game.player;
  const vel = vec(0, 0)
  const inputListener = (evt: Input.KeyEvent) => {
    if (
      engine.input.keyboard.isHeld(Input.Keys.W) || 
      engine.input.keyboard.isHeld(Input.Keys.Up)) {
      vel.y = -player.velocity;
    } else if (
      engine.input.keyboard.isHeld(Input.Keys.S) || 
      engine.input.keyboard.isHeld(Input.Keys.Down)) {
      vel.y = player.velocity;
    } else {
      vel.y = 0;
    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.A) || 
      engine.input.keyboard.isHeld(Input.Keys.Left)) {
      vel.x = -player.velocity;
    } else if (
      engine.input.keyboard.isHeld(Input.Keys.D) || 
      engine.input.keyboard.isHeld(Input.Keys.Right)) {
      vel.x = player.velocity;
    } else {
      vel.x = 0;
    }

    if (!player.vel.equals(vel)) {
      player.vel = vel;
      player.emit('moved', vel);
    }
  };

  engine.input.keyboard.on("press", inputListener);
  engine.input.keyboard.on("release", inputListener);
});
