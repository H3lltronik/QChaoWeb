<template>
    <div>
        <navbar-component></navbar-component>
        <b-container fluid class="mt-5">
            <!-- b-row de la tabla -->
            <b-row v-for="(innerAux, index) in 3" :key="index">
                <b-col sm="10" class="mt-4 text-left">
                    <h2 class="h4">Categoria del foro</h2>
                </b-col>
                <b-col sm="12">
                    <table class="table table-striped table-bordered table-responsive">
                        <thead class="thead-light text-left">
                            <tr class="row">
                                <th class="col-8">Foro</th>
                                <th class="col-1">Temas</th>
                                <th class="col-1">Posts</th>
                                <th class="col-2">Ultimo post</th>
                            </tr>
                        </thead>
                        <tbody class="text-left">
                            <tr class="row" v-for="(innerAux, index) in 5" :key="index">
                                <td class="col-8">
                                    <h3 class="h5"><a href="#0">Nombre del foro</a></h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eveniet aut dignissimos voluptas quae accusamus quisquam, voluptatibus consectetur ea earum. Eos dolorum, repellat porro quis quia itaque. Maxime, aperiam assumenda.</p>
                                </td>
                                <td class="col-1">
                                    <div>5</div>
                                </td>
                                <td class="col-1">
                                    <div>18</div>
                                </td>
                                <td class="col-2">
                                    <h4 class="h6"><a href="#">Nombre del post</a></h4>
                                    <div>Por: <a href="#0">Nombre del autor</a></div>
                                    <div>24 Febrero 2017 20:07</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </b-container> 
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    }
}
</script>

<style>
    
</style>