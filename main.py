import arcade

WIDTH, HEIGHT, TITLE = 960, 540, "Arkos Inari — Foxfire Trial"

class TitleView(arcade.View):
    def on_show_view(self):
        arcade.set_background_color(arcade.color.BLACK)

    def on_draw(self):
        self.clear()
        arcade.draw_text("Arkos Inari", WIDTH/2, HEIGHT/2+30,
                         arcade.color.AMBER, 36, anchor_x="center")
        arcade.draw_text("Press SPACE to begin", WIDTH/2, HEIGHT/2-20,
                         arcade.color.LIGHT_GRAY, 16, anchor_x="center")

    def on_key_press(self, key, modifiers):
        if key == arcade.key.SPACE:
            self.window.show_view(GameView())

class Player(arcade.SpriteCircle):
    def __init__(self):
        super().__init__(12, arcade.color.CYAN)
        self.center_x, self.center_y = WIDTH/2, HEIGHT/2
        self.speed = 220

    def update(self, dt, keys):
        vx = (keys.get(arcade.key.RIGHT) or keys.get(arcade.key.D)) and 1 or 0
        vx -= (keys.get(arcade.key.LEFT)  or keys.get(arcade.key.A)) and 1 or 0
        vy = (keys.get(arcade.key.UP)    or keys.get(arcade.key.W)) and 1 or 0
        vy -= (keys.get(arcade.key.DOWN) or keys.get(arcade.key.S)) and 1 or 0
        self.center_x = min(max(12, self.center_x + vx * self.speed * dt), WIDTH-12)
        self.center_y = min(max(12, self.center_y + vy * self.speed * dt), HEIGHT-12)

class GameView(arcade.View):
    def on_show_view(self):
        arcade.set_background_color(arcade.color.DARK_SLATE_GRAY)
        self.player = Player()
        self.keys = {}

    def on_draw(self):
        self.clear()
        self.player.draw()
        arcade.draw_text("Move: WASD/Arrows — ESC: Title", 10, 10, arcade.color.LIGHT_GRAY, 12)

    def on_update(self, dt):
        self.player.update(dt, self.keys)

    def on_key_press(self, key, modifiers):
        if key == arcade.key.ESCAPE:
            self.window.show_view(TitleView())
        self.keys[key] = True

    def on_key_release(self, key, modifiers):
        self.keys[key] = False

def main():
    window = arcade.Window(WIDTH, HEIGHT, TITLE, update_rate=1/120)
    window.show_view(TitleView())
    arcade.run()

if __name__ == "__main__":
    main()
