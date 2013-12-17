ig.module
(
    'game.ressource-base'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    RessourceBase = ig.Entity.extend(
    {
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        maxVel: { x: 0, y: 0 },

        health: 100,

        res_add_timer: 0,

        res_type: 0,
        res_amount: 0,

        sound_hit: 0,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);

            this.res_add_timer = new ig.Timer(1);
        },

        update: function ()
        {
            this.parent();
        },

        check: function (other)
        {
            if (other instanceof EntityUnitsWorker)
            {
                if (this.res_add_timer.delta() >= 0)
                {
                    this.sound_hit.play();
                    ig.game.add_resources(this.res_type, this.res_amount);
                    this.receiveDamage(this.res_amount, this);
                    this.res_add_timer.reset();
                }
                
                other.is_building();
            }
        },

        receiveDamage: function(amount, from)
        {
            this.parent(amount, from);
        },

        kill: function()
        {
            this.parent();
        },
    });
});