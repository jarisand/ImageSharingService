/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author jari
 */
@Entity
@Table(name = "RATE")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Rate.findAll", query = "SELECT r FROM Rate r"),
    @NamedQuery(name = "Rate.findByRid", query = "SELECT r FROM Rate r WHERE r.rid = :rid"),
    @NamedQuery(name = "Rate.findByGrade", query = "SELECT r FROM Rate r WHERE r.grade = :grade")})
public class Rate implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "RID")
    private Integer rid;
    @Column(name = "GRADE")
    private Integer grade;
    @JoinColumn(name = "RATED_IMG", referencedColumnName = "IID")
    @ManyToOne
    private Image ratedImg;
    @JoinColumn(name = "RATER", referencedColumnName = "UID")
    @ManyToOne
    private User rater;

    public Rate() {
    }

    public Rate(Integer rid) {
        this.rid = rid;
    }

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public Image getRatedImg() {
        return ratedImg;
    }

    public void setRatedImg(Image ratedImg) {
        this.ratedImg = ratedImg;
    }

    public User getRater() {
        return rater;
    }

    public void setRater(User rater) {
        this.rater = rater;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (rid != null ? rid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Rate)) {
            return false;
        }
        Rate other = (Rate) object;
        if ((this.rid == null && other.rid != null) || (this.rid != null && !this.rid.equals(other.rid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Database.Rate[ rid=" + rid + " ]";
    }
    
}
