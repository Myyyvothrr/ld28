ig.module
(
    'game.entities.buildings-treecutter'
)
.requires
(
	'impact.entity',
    'impact.entity-pool',
    'game.building-base'
)
.defines(function ()
{
    EntityBuildingsTreecutter = BuildingBase.extend(
    {
        animSheet: new ig.AnimationSheet('media/buildings/treecutter.png', 32, 32),
        size: { x: 32, y: 32 },
        offset: { x: 0, y: 0 },
        zIndex: 44,

        building_speed: 0.1,

        res_type: 'wood',

        wood_costs: 200,
        stone_costs: 100,
        water_costs: 50,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
        },
    });

    ig.EntityPool.enableFor(EntityBuildingsTreecutter);
});