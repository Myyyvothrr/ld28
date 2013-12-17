ig.module
(
    'game.entities.buildings-well'
)
.requires
(
	'impact.entity',
    'impact.entity-pool',
    'game.building-base'
)
.defines(function ()
{
    EntityBuildingsWell = BuildingBase.extend(
    {
        animSheet: new ig.AnimationSheet('media/buildings/well.png', 16, 16),
        size: { x: 16, y: 16 },
        offset: { x: 0, y: 0 },
        zIndex: 46,

        res_add_timer: 0,
        res_amount: 1,
        res_type: 'water',

        health: 100,
        empty: false,
        
        building_speed: 0.5,

        wood_costs: 50,
        stone_costs: 50,
        water_costs: 0,

        sound_hit: new ig.Sound('media/sounds/water.*'),

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 0.5, [0, 1]);
            this.addAnim('empty', 1, [2]);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);

            this.res_add_timer = new ig.Timer(1);
        },

        receiveDamage: function(amount, from)
        {
            this.health -= amount;
            if (this.health <= 0)
            {
                this.empty = true;
                this.currentAnim = this.anims.empty;
            }
        },

        check: function(other)
        {
            this.parent(other);

            if (!this.empty && this.is_built && this.is_placed && other instanceof EntityUnitsWorker)
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
        }
    });

    ig.EntityPool.enableFor(EntityBuildingsWell);
});