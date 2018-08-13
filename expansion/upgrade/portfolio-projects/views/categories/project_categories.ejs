<%- include("../../../../../important/admin/views/_layouts/adminheader") %>
    <h2 class="admin-page__main-title">project categories</h2>
    <% include ../../../../../important/admin/views/_layouts/messages/messages %>
        <button class="admin-button admin-button--add-something">
            <a href="/admin/portfolio-categories/add-portfolio-category">+</a>
        </button>
    <br>
    <br>

    <% if (count > 0) { %>
    <div class="blocks-holder">
                <% categories.forEach(function(cat) { %>
                <div class="admin-blocks" id="id_<%= cat._id %>" class="<%= cat.slug %>">
                <a href="/admin/portfolio-categories/edit-portfolio-category/<%= cat._id %>">
                <h4>
                    title:
                </h4>
                        <h5>
                            <%= cat.title %>
                        </h5>
                        <h4>
                            description:
                        </h4>
                        <h5>
                            <%= cat.description %>
                        </h5>
                       
                        <% if (cat.title == "General") { %>
                            <h5>

                            </h5>
                            <% } else { %>
                                <form class="admin-blocks__delete-stuffs" method="post" action="/admin/portfolio-categories/delete-portfolio-category/<%= cat._id %>?_method=DELETE">
                                <input type="hidden" name="_method" value="DELETE">
                                <button type="submit">Delete</button>
                            </form>
                                <% } %>
                                </a>
                    </div>
                    <% }); %>
           </div>
        <% } else { %>
            <h3 class="admin-page__none-of-something">There are no portfolio categories, you should make one...</h3>
            <% } %>
            <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
            <script>
                $('.blocks-holder').sortable({
                    items: "div",
                    update: function () {
                        let ids = $(".blocks-holder").sortable("serialize");
                        let url = "/admin/portfolio-categories/reorder-projects";
                        $.post(url, ids);
                    }
                }, "refresh");
            </script>
                <%- include("../../../../../important/admin/views/_layouts/adminfooter") %>
