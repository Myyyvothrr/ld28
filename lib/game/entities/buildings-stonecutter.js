ig.module
(
    'game.entities.buildings-stonecutter'
)
.requires
(
	'impact.entity',
    'impact.entity-pool',
    'game.building-base'
)
.defines(function ()
{
    EntityBuildingsStonecutter = BuildingBase.extend(
    {
        animSheet: new ig.AnimationSheet('media/buildings/stonecutter.png', 32, 32),
        size: { x: 32, y: 32 },
        offset: { x: 0, y: 0 },
        zIndex: 45,

        building_speed: 0.1,

        res_type: 'stones',

        wood_costs: 100,
        stone_costs: 50,
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

    ig.EntityPool.enableFor(EntityBuildingsStonecutter);
});