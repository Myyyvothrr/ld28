ig.module
(
    'game.entities.buildings-castle'
)
.requires
(
	'impact.entity',
    'game.building-base'
)
.defines(function ()
{
    EntityBuildingsCastle = BuildingBase.extend(
    {
        animSheet: new ig.AnimationSheet('media/buildings/castle.png', 64, 64),
        size: { x: 64, y: 64 },
        offset: { x: 0, y: 0 },
        zIndex: 50,

        building_speed: 0.025,

        res_type: 'castle',

        wood_costs: 1000,
        stone_costs: 1000,
        water_costs: 1000,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
        },
    });
});