ig.module
(
    'game.entities.buildings-dirt'
)
.requires
(
	'impact.entity',
    'impact.entity-pool'
)
.defines(function ()
{
    EntityBuildingsDirt = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/buildings/dirt.png', 16, 16),
        size: { x: 16, y: 16 },
        offset: { x: 0, y: 0 },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        zIndex: 20,
        maxVel: { x: 0, y: 0 },
        health: 1,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
            this.addAnim('work', 0.2, [1, 2]);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
        },

        working: function()
        {
            this.currentAnim = this.anims.work;
        },

        update: function ()
        {
            this.parent();

            this.currentAnim = this.anims.idle;
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
    });

    ig.EntityPool.enableFor(EntityBuildingsDirt);
});