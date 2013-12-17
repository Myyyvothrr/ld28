ig.module
(
    'game.entities.ressources-rock'
)
.requires
(
	'impact.entity',
    'impact.entity-pool',    
    'game.ressource-base'
)
.defines(function ()
{
    EntityRessourcesRock = RessourceBase.extend(
    {
        animSheet: new ig.AnimationSheet('media/ressources/rock.png', 16, 16),
        size: { x: 16, y: 16 },
        offset: { x: 0, y: 0 },
        zIndex: 30,

        health: 50,

        res_type: 'stones',
        res_amount: 1,

        sound_hit: new ig.Sound('media/sounds/rock_hit.*'),

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

    ig.EntityPool.enableFor(EntityRessourcesRock);
});