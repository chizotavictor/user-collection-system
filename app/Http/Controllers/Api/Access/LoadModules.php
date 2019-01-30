<?php

namespace App\Http\Controllers\Api\Access;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserModules;
use App\SubModule;
use Illuminate\Support\Facades\DB;

class LoadModules extends Controller
{
    public function loadUserAssignedModule(Request $request)
    {
        if(\Auth::check()){
            $userID     = \Auth::user()->id;
            // $userCode   = \Auth::user()->userCode;

            $result =  self::getModule($userID, $request);

            return response()->json( $result , 200);
           
        }else{
            return response()->json(['status' => false, 'message' => 'Unauthenticated.'], 401);
        }
    }

    public static function getModule($userId, $request)
    {
        // $filterUserCode = explode('-', $userCode);
        $moduleObject = UserModules::where(['userId' => $userId])->get()->first();

        if(is_null($moduleObject) )
        {
            return ['menus' => array(null)];
        }else{
            $moduleContainer  = $moduleObject->raw;
            $str_array = explode(';', $moduleContainer);
            $str_array = array_filter($str_array);
                
            //return $str_array;
        
            if($request->module == "")
            {
                if(count($str_array) > 0)
                {
                    $ref_id = null;
                    $mainmodule = array();
                    
                    for ($i=0; $i < count($str_array); $i++) {
                        // load the module array element by id to get the id of their parent
                        $ref_id[$i] = self::loadSubMenuId($str_array[$i]);
                    }

                    $ref_id = array_values(array_unique($ref_id));
    
                    for ($i=0; $i < count($ref_id); $i++) {
                        array_push($mainmodule,  self::loadMainMenuName($ref_id[$i]));
                    }

                    if(count($mainmodule) < 1 )
                    {
                        return array('menus' => []);
                    }else{
                        return array('menus' => array_filter($mainmodule));
                    }
                }else{
                    return array('menus' => []);
                }
            }else{
                return self::loadSubModules($request);
            }

        } 
    }

 

    /**
     *  Loading the submenu items.. returns main-menu ID 
     */
    public static function loadSubMenuId($systemCode)
    {
        if($systemCode == null){
            return null;
        }else{
            $query_object = DB::table('sub_modules')->where('systemCode',  $systemCode)->first();
            return  $query_object->reference;
        }
    }


    /**
     *  Loading Main menu items..
     */
    public static function loadMainMenuName($reference){
        $query_object = DB::table('modules')->where('id',  $reference)->first();
        return $query_object;
    }


    public static function loadSubModules($request)
    {
        # Middleware has to be executed to check for the valid token
    
        #get the role type
        $vendorMod = DB::select('select * from user_modules where userId = ?', [\Auth::user()->id]);

        return self::filterModule($vendorMod[0]->raw, $request->module);
        //return response()->json( self::filterModule($vendorMod[0]->submodules, $request->module) )->setStatusCode(200, null);
    }

    public static function filterModule($modules, $selected_module)
    {
        $str_array = explode(";", $modules);
        $str_selected_mod_aray = explode("-", $selected_module);
        $prefix = $str_selected_mod_aray[0];

        if(count($str_array) > 0)
        {
            $submodules = array();
            for ($i=0; $i < count($str_array); $i++) {

                if(self::getPrefix($str_array[$i]) == $prefix){
                    array_push($submodules, self::loadMainMenuByCode($str_array[$i]));
                }
            }
            array_push($submodules, array("id" => 101, "name" => "RETURN", "systemCode" => "BACKWARD", "image" => "back.png", "description" => "", "pricing" => "0.00", "reference" => 0, "created_at" => "2018-06-23 17:57:35", "updated_at" => "2018-06-23 17:57:35"));
            return array('menus' => array_reverse($submodules));
        }else{
            return array('menus' => []);
        }
    }

    public static function getPrefix($string)
    {
        $str_array = explode("-", $string);
        return $str_array[0];
    }

     /**
     *  Loading Main submenu items by systemCode..
     */
    public static function loadMainMenuByCode($reference){
        $query_object = DB::table('sub_modules')->where('systemCode', $reference)->first();
        return $query_object;
    }

}
