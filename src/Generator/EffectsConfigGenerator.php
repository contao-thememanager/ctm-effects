<?php

namespace ContaoThemeManager\Effects\Generator;

use ContaoThemeManager\Core\Generator\ConfigGenerator;
use ContaoThemeManager\Core\StyleManager\StyleManagerXML;

/**
 * Generates css and xml for effects
 *
 * @author Sebastian Zoglowek <https://github.com/zoglo>
 */
class EffectsConfigGenerator extends ConfigGenerator
{
    private array $animDelayContainers    = [''=>[], 'txt_'=>[], 'img_'=>[], 'ico_'=>[], 'lnk_'=>[], 'frm_'=>[]];
    private array $animDurationContainers = [''=>[], 'txt_'=>[], 'img_'=>[], 'ico_'=>[], 'lnk_'=>[], 'frm_'=>[]];
    private array $effectFactorContainers = [''=>[], 'txt_'=>[], 'img_'=>[], 'ico_'=>[], 'lnk_'=>[], 'frm_'=>[]];
    private array $effectDurationContainers = [''=>[], 'txt_'=>[], 'img_'=>[], 'ico_'=>[], 'lnk_'=>[], 'frm_'=>[]];

    public function generateOptions(array $configVars, StyleManagerXML $xml): void
    {
        self::setEffectOptions(
            $this->animDelayContainers,
            $configVars,
            'fx-animation-delays',
            'anim-dly-',
            ' Sec',
            [0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.75,1,1.5,2,3]
        );

        self::setEffectOptions(
            $this->animDurationContainers,
            $configVars,
            'fx-animation-durations',
            'anim-dtn-',
            ' Sec',
            [0.5,1,1.5,2,2.5,3]
        );

        self::setEffectOptions(
            $this->effectFactorContainers,
            $configVars,
            'fx-effect-factors',
            'efc-fct-',
            '',
            [0.1,0.25,0.5,0.75,1.25,1.5,2,2.5,3,3.5,4,4.5,5]
        );

        self::setEffectOptions(
            $this->effectDurationContainers,
            $configVars,
            'fx-effect-durations',
            'efc-dtn-',
            ' Sec',
            [0.5,1,1.5,2,2.5,3,4,5,6,10,15,20,30,40]
        );

        $xml->addGroup('gHeadline')
            ->addChild('animationDelay',        $this->animDelayContainers[''])
            ->addChild('animationDuration',     $this->animDurationContainers[''])
            ->addChild('effectFactor',          $this->effectFactorContainers[''])
            ->addChild('effectDuration',        $this->effectDurationContainers['']);
        $xml->addGroup('gPagination')
            ->addChild('animationDelay',        $this->animDelayContainers[''])
            ->addChild('animationDuration',     $this->animDurationContainers['']);
        $xml->addGroup('gLayout')
            ->addChild('animationDelay',        $this->animDelayContainers[''])
            ->addChild('animationDuration',     $this->animDurationContainers[''])
            ->addChild('effectFactor',          $this->effectFactorContainers[''])
            ->addChild('effectDuration',        $this->effectDurationContainers['']);
        $xml->addGroup('cLayout')
            ->addChild('animationDelay',        $this->animDelayContainers[''])
            ->addChild('animationDuration',     $this->animDurationContainers[''])
            ->addChild('animationDelayForm',    $this->animDelayContainers['frm_'])
            ->addChild('animationDurationForm', $this->animDurationContainers['frm_'])
            ->addChild('effectFactor',          $this->effectFactorContainers[''])
            ->addChild('effectDuration',        $this->effectDurationContainers[''])
            ->addChild('effectFactorForm',      $this->effectFactorContainers['frm_'])
            ->addChild('effectDurationForm',    $this->effectDurationContainers['frm_']);
        $xml->addGroup('eGridList')
            ->addChild('animationDelayList',    $this->animDelayContainers[''])
            ->addChild('animationDurationList', $this->animDurationContainers[''])
            ->addChild('effectFactorList',      $this->effectFactorContainers[''])
            ->addChild('effectDurationList',    $this->effectDurationContainers['']);
        $xml->addGroup('eList')
            ->addChild('animationDelayList',    $this->animDelayContainers[''])
            ->addChild('animationDurationList', $this->animDurationContainers[''])
            ->addChild('effectFactorList',      $this->effectFactorContainers[''])
            ->addChild('effectDurationList',    $this->effectDurationContainers['']);
        $xml->addGroup('eText')
            ->addChild('animationDelayList',    $this->animDelayContainers['txt_'])
            ->addChild('animationDurationList', $this->animDurationContainers['txt_'])
            ->addChild('effectFactorList',      $this->effectFactorContainers['txt_'])
            ->addChild('effectDurationList',    $this->effectDurationContainers['txt_']);
        $xml->addGroup('eImage')
            ->addChild('animationDelayList',    $this->animDelayContainers['img_'])
            ->addChild('animationDurationList', $this->animDurationContainers['img_'])
            ->addChild('effectFactorList',      $this->effectFactorContainers['img_'])
            ->addChild('effectDurationList',    $this->effectDurationContainers['img_']);
        $xml->addGroup('eIcon')
            ->addChild('animationDelayList',    $this->animDelayContainers['ico_'])
            ->addChild('animationDurationList', $this->animDurationContainers['ico_'])
            ->addChild('effectFactorList',      $this->effectFactorContainers['ico_'])
            ->addChild('effectDurationList',    $this->effectDurationContainers['ico_']);
        $xml->addGroup('eLink')
            ->addChild('animationDelay',        $this->animDelayContainers[''])
            ->addChild('animationDuration',     $this->animDurationContainers[''])
            ->addChild('animationDelayList',    $this->animDelayContainers['lnk_'])
            ->addChild('animationDurationList', $this->animDurationContainers['lnk_'])
            ->addChild('effectFactor',          $this->effectFactorContainers[''])
            ->addChild('effectDuration',        $this->effectDurationContainers[''])
            ->addChild('effectFactorList',      $this->effectFactorContainers['lnk_'])
            ->addChild('effectDurationList',    $this->effectDurationContainers['lnk_']);
    }

    private function setEffectOptions(array &$containers, array $configVars, string $configKey, string $classPrefix = '', string $labelSuffix = '', array $defaults = []): void
    {
        // Fallback to default values
        if (null === ($configOptions = self::getThemeManagerConfigVar($configVars, $configKey)))
        {
            $configOptions = $defaults;
        }
        else
        {
            $configOptions = explode(',', $configOptions);
        }

        foreach ($configOptions as $option)
        {
            $k = $classPrefix . str_replace('.','-', $option);
            $v = $option . $labelSuffix;

            foreach ($containers as $name => &$container)
            {
                $container[] = ['key' =>$name.$k,'value'=>$v];
            }
        }
    }
}
