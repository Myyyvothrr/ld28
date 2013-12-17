ig.module
(
    'game.unit-base'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    UnitBase = ig.Entity.extend(
    {
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,

        move_to: { x: 0, y: 0, dx: 0, dy: 0 },
        is_moving: false,

        n: 0,

        speed: 10,

        right: true,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
        },

        update: function ()
        {
            this.parent();

            if (this.is_moving)
            {
                this.move_to.dx = Math.floor(this.pos.x - this.move_to.x);
                this.move_to.dy = Math.floor(this.pos.y - this.move_to.y);

                if (this.move_to.dx == 0 && this.move_to.dy == 0)
                {
                    this.is_moving = false;
                }
                else
                {
                    if (this.move_to.dx != 0)
                        this.vel.x = this.move_to.x - this.pos.x;

                    if (this.move_to.dy != 0)
                        this.vel.y = this.move_to.y - this.pos.y;
                }
            }
            else
            {
                this.vel.x = 0;
                this.vel.y = 0;
            }

            if (this.vel.x != 0 || this.vel.y != 0)
            {
                this.n = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
                this.vel.x = (this.vel.x / this.n) * this.speed;
                this.vel.y = (this.vel.y / this.n) * this.speed;
                this.currentAnim = this.anims.walk_r;

                this.right = (this.vel.x >= 0);
            }
            else
            {
                this.currentAnim = this.anims.idle;
            }

            this.currentAnim.flip.x = !this.right;
        },

        check: function (other)
        {
        },

        receiveDamage: function(amount, from)
        {
        },

        kill: function()
        {
            this.parent();
        },

        move_to: function(p)
        {
            this.move_to.x = p.x;
            this.move_to.y = p.y;
            this.is_moving = true;
        },
    });
});