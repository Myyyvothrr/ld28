ig.module
(
    'game.entities.units-worker'
)
.requires
(
	'impact.entity',
    'impact.entity-pool',
    'game.unit-base'
)
.defines(function ()
{
    EntityUnitsWorker = UnitBase.extend(
    {
        animSheet: new ig.AnimationSheet('media/units/worker.png', 8, 16),
        size: { x: 8, y: 16 },
        offset: { x: 0, y: 0 },
        zIndex: 60,
        maxVel: { x: 100, y: 100 },
        health: 100,
        speed: 30,

        building_anim: false,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1.2, [0, 1]);
            this.addAnim('walk_r', 0.25, [2, 3, 4, 5]);
            this.addAnim('work_r', 0.4, [6, 7]);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
        },

        update: function ()
        {
            this.parent();

            if (this.building_anim)
                this.currentAnim = this.anims.work_r;
            
            this.currentAnim.flip.x = !this.right;

            this.building_anim = false;

            if (ig.input.pressed('click2'))
                this.move_to(ig.game.get_pos(ig.input.mouse.x, ig.input.mouse.y));
        },

        is_building: function()
        {
            this.building_anim = true;
        },
    });

    ig.EntityPool.enableFor(EntityUnitsWorker);
});